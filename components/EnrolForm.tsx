"use client";

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/SectionHeading";
import { enquiryEndpoint } from "@/lib/site";
import content from "@/data/general.json";
import contactContent from "@/data/contact.json";
import type { ContactContent, GeneralContent } from "@/data/types";

const general: GeneralContent = content;
const contact: ContactContent = contactContent;

/** A field id paired with the label used for it in the message that gets sent. */
type Field = [id: string, label: string];

interface Section {
  heading: string;
  /**
   * Qualifies this section's labels for the JSON payload, where they have to be
   * unique across the whole form. Three of the enrolment sections have a "First
   * name", and keying on the bare labels gives a payload in which the student
   * is silently overwritten by the second guardian.
   *
   * The email body needs none of this: there the headings already say whose
   * name is whose, so the labels stay short.
   */
  prefix?: string;
  fields: Field[];
}

const ENQUIRY_SECTIONS: Section[] = [
  {
    heading: "Enquiry",
    fields: [
      ["q_name", "Student name"],
      ["q_yr", "School year"],
      ["q_mobile", "Contact number"],
      ["q_email", "Email"],
      ["q_message", "Message"],
    ],
  },
];

const ENROLMENT_SECTIONS: Section[] = [
  {
    heading: "Student",
    prefix: "Student",
    fields: [
      ["s_firstname", "First name"],
      ["s_lastname", "Last name"],
      ["s_addr", "Address"],
      ["s_school", "School"],
      ["s_yr", "School year"],
      ["s_post", "Postcode"],
      ["s_mobile", "Mobile"],
      ["s_email", "Email"],
    ],
  },
  {
    heading: "First parent/guardian",
    prefix: "Parent 1",
    fields: [
      ["p_firstname", "First name"],
      ["p_lastname", "Last name"],
      ["p_mobile", "Mobile"],
      ["p_email", "Email"],
    ],
  },
  {
    heading: "Second parent/guardian",
    prefix: "Parent 2",
    fields: [
      ["p2_firstname", "First name"],
      ["p2_lastname", "Last name"],
      ["p2_mobile", "Mobile"],
      ["p2_email", "Email"],
    ],
  },
];

const SCHOOL_YEARS = [6, 7, 8, 9, 10, 11, 12];

/** Column name for a field — unique across the whole form. See Section.prefix. */
const columnName = (section: Section, label: string) =>
  section.prefix ? `${section.prefix} ${label}` : label;

/**
 * Keeps a multi-line answer from reading as the start of a new field.
 *
 * The fields on a line are separated by pipes, so an answer that breaks across
 * lines needs its later lines set in from the margin — otherwise the second
 * line of a message sits exactly where a heading would. Nothing is collapsed:
 * the visitor's own line breaks survive, which they only can because the one
 * free-text box on either form is the last field on its line, so a run-on never
 * interrupts a pipe.
 */
const continued = (answer: string, indent: string) =>
  answer.replace(/\r\n?/g, "\n").split("\n").join(`\n${indent}`);

/**
 * `YYYY-MM-DD HH:MM`, built by hand rather than through toLocaleString, so the
 * date is unambiguous wherever it is read — a locale-formatted one is two
 * different days depending on who opens it, any time the day is 12 or lower.
 */
const timestamp = (date: Date) => {
  const pad = (part: number) => String(part).padStart(2, "0");
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  );
};

/**
 * Builds the message that gets emailed.
 *
 * One line per section, under the same heading the form used, with the answered
 * fields written `Label: value` and separated by pipes. Blank fields are left
 * out, and a section left entirely blank — in practice the optional second
 * guardian — is dropped with them.
 *
 * The columns it returns are a separate matter: they carry every field, blank
 * or not, and are what the JSON payload is built from.
 */
const buildMessage = (
  sections: Section[],
  title: string,
  submitted: string,
  value: (id: string) => string,
) => {
  const columns = sections.flatMap((section) =>
    section.fields.map(([id, label]) => ({
      name: columnName(section, label),
      value: value(id),
    })),
  );

  const answered = sections
    .map(({ heading, fields }) => ({
      heading,
      entries: fields
        .filter(([id]) => value(id))
        .map(([id, label]) => [label, value(id)] as const),
    }))
    .filter(({ entries }) => entries.length);

  // The enquiry form is a single section, and its heading would only repeat the
  // title on the line above. Headings earn their place — and the indent that
  // goes with them — once there is more than one group to tell apart.
  const grouped = sections.length > 1;
  const indent = grouped ? "  " : "";

  const readable = answered
    .map(({ heading, entries }) => {
      const line = entries
        .map(
          ([label, answer]) => `${label}: ${continued(answer, indent + "  ")}`,
        )
        .join(" | ");

      return grouped ? `${heading}\n${indent}${line}` : line;
    })
    .join("\n\n")
    // Some mail clients strip trailing spaces and some do not; trimming here
    // means a message with a blank line in it looks the same in both.
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  const body = [title, `Submitted: ${submitted}`, "|", readable, ""].join("\n");

  return { body, columns };
};

type Mode = "enquiry" | "enrolment";

/**
 * Which form is showing is part of the address, so a link can open straight
 * onto the long one — "fill this in and send it back" is most of what gets
 * asked over the phone, and until now there was no way to link to it.
 *
 * Only the non-default mode is ever written: /enrol on its own means the quick
 * enquiry, so the tidy URL stays the common one.
 */
const MODE_PARAM = "form";
const LINKABLE_MODE: Mode = "enrolment";

const modeFromSearch = (search: string): Mode =>
  new URLSearchParams(search).get(MODE_PARAM) === LINKABLE_MODE
    ? LINKABLE_MODE
    : "enquiry";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; via: "endpoint" | "mail-client" }
  | { state: "error"; message: string };

export default function EnrolForm() {
  const [mode, setMode] = useState<Mode>("enquiry");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  // Read after mount rather than during render. Every route here is statically
  // generated, so the server has no query string to render from — seeding the
  // initial state from one would be a hydration mismatch, and reaching for
  // useSearchParams instead would opt the whole page out of static rendering.
  useEffect(() => {
    const sync = () => setMode(modeFromSearch(window.location.search));

    sync();

    // Back and forward can land on a different form than the one on screen.
    // Switching tabs uses replaceState, so this only fires for real
    // navigations, not for the visitor's own clicks below.
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const sections = mode === "enquiry" ? ENQUIRY_SECTIONS : ENROLMENT_SECTIONS;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const value = (key: string) =>
      (form.get(key) as string | null)?.trim() ?? "";

    const studentName =
      mode === "enquiry"
        ? value("q_name")
        : [value("s_firstname"), value("s_lastname")].filter(Boolean).join(" ");

    const title = mode === "enquiry" ? "Enquiry" : "Enrolment request";
    const subject = [title, studentName].filter(Boolean).join(" – ");
    const submitted = timestamp(new Date());

    const { body, columns } = buildMessage(sections, title, submitted, value);

    const openMailClient = () => {
      window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
    };

    // Without a configured endpoint the only thing we can do is hand off to the
    // visitor's mail client. That silently does nothing on a lot of phones, so
    // the confirmation below says so plainly rather than claiming it was sent.
    if (!enquiryEndpoint) {
      openMailClient();
      setStatus({ state: "sent", via: "mail-client" });
      return;
    }

    setStatus({ state: "sending" });

    try {
      // Qualified column names, not bare labels. Keyed on the labels alone,
      // "First name" appeared three times and Object.fromEntries kept only the
      // last — every enrolment reached the endpoint with the student's name,
      // mobile and email quietly replaced by the second guardian's.
      const payload = Object.fromEntries(
        columns
          .filter((column) => column.value)
          .map((column) => [column.name, column.value]),
      );

      const response = await fetch(enquiryEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject,
          type: mode,
          submitted,
          message: body,
          ...payload,
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      setStatus({ state: "sent", via: "endpoint" });
      formElement.reset();
    } catch {
      setStatus({
        state: "error",
        message:
          "We couldn't send that just now. Please try again, or email or call us directly — the details are at the bottom of this page.",
      });
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setStatus({ state: "idle" });

    // replaceState, not pushState: flipping between two tabs is not navigation,
    // and a visitor who tried both should not have to press Back twice to leave
    // the page.
    const url = new URL(window.location.href);
    if (next === LINKABLE_MODE) url.searchParams.set(MODE_PARAM, next);
    else url.searchParams.delete(MODE_PARAM);

    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  };

  return (
    <div className="mx-4 my-24 md:m-24 rounded-xs border border-hairline bg-zinc-100/70 p-8 dark:bg-zinc-900/40">
      <SectionHeading>Enrol</SectionHeading>
      <p className="mt-3">{general.enrolIntro}</p>

      <div
        className="mt-6 inline-flex rounded-xs border border-hairline"
        role="group"
        aria-label="Choose a form"
      >
        <ModeButton
          active={mode === "enquiry"}
          onClick={() => switchMode("enquiry")}
        >
          Quick enquiry
        </ModeButton>
        <ModeButton
          active={mode === "enrolment"}
          onClick={() => switchMode("enrolment")}
        >
          Full enrolment
        </ModeButton>
      </div>

      <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
        {mode === "enquiry"
          ? "We'll contact you to talk through class options."
          : "Everything we need to place a student in a class. Second parent/guardian is optional."}
      </p>

      <form
        className="flex flex-col gap-8 mt-6"
        onSubmit={handleSubmit}
        // Remount on mode change so the browser clears the previous form's
        // values and validation state instead of carrying them across.
        key={mode}
      >
        {mode === "enquiry" ? <EnquiryFields /> : <EnrolmentFields />}

        <div className="flex flex-col gap-3">
          <button
            className="btn-accent cursor-pointer h-11 w-full rounded-xs bg-accent-brand font-medium text-accent-contrast disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={status.state === "sending"}
          >
            {status.state === "sending"
              ? "Sending…"
              : mode === "enquiry"
                ? "Send enquiry"
                : "Send enrolment request"}
          </button>

          <FormStatus status={status} />
        </div>
      </form>
    </div>
  );
}

/**
 * The result of submitting, announced to screen readers as soon as it changes.
 * Previously there was no confirmation of any kind — the form simply appeared
 * to do nothing whether it had worked or not.
 */
const FormStatus = ({ status }: { status: Status }) => {
  const message = (() => {
    if (status.state === "sent" && status.via === "endpoint")
      return "Thanks! We've got your details and will be in touch shortly.";
    if (status.state === "sent" && status.via === "mail-client")
      return "Your email app should have opened with the details filled in. Press send there to finish. If nothing opened, please call or email us instead.";
    if (status.state === "error") return status.message;
    return "";
  })();

  const tone =
    status.state === "error"
      ? "text-red-700 dark:text-red-400"
      : "text-neutral-700 dark:text-neutral-300";

  return (
    <p role="status" aria-live="polite" className={`text-sm min-h-5 ${tone}`}>
      {message}
    </p>
  );
};

const ModeButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "relative cursor-pointer px-4 py-2.5 text-sm font-medium transition-colors",
      active
        ? "text-neutral-900 dark:text-zinc-50"
        : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-zinc-50",
    )}
  >
    {children}
    {active && (
      <span aria-hidden="true" className="rule-h absolute inset-x-3 bottom-1" />
    )}
  </button>
);

const EnquiryFields = () => (
  <Group legend="About the student">
    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
      <LabelInputContainer>
        <Label htmlFor="q_name">Student name</Label>
        <Input
          id="q_name"
          name="q_name"
          autoComplete="name"
          placeholder="Jane Doe"
          type="text"
          required
        />
      </LabelInputContainer>
      <SchoolYearField id="q_yr" />
    </div>

    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
      <LabelInputContainer>
        <Label htmlFor="q_mobile">Contact number</Label>
        <Input
          id="q_mobile"
          name="q_mobile"
          autoComplete="tel"
          placeholder="0412 345 678"
          type="tel"
          required
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="q_email">Email (optional)</Label>
        <Input
          id="q_email"
          name="q_email"
          autoComplete="email"
          placeholder="example@email.com"
          type="email"
        />
      </LabelInputContainer>
    </div>

    <LabelInputContainer>
      <Label htmlFor="q_message">
        Anything you&apos;d like us to know (optional)
      </Label>
      <textarea
        id="q_message"
        name="q_message"
        rows={3}
        placeholder="Your preferred contact method, preferred days, current school etc…"
        className="flex w-full rounded-xs border border-hairline bg-white px-3 py-2 text-sm transition-colors duration-200 placeholder:text-neutral-400 hover:border-neutral-400 focus-visible:border-accent-brand focus-visible:ring-1 focus-visible:ring-accent-brand focus-visible:outline-none dark:bg-zinc-900 dark:hover:border-neutral-600"
      />
    </LabelInputContainer>
  </Group>
);

const EnrolmentFields = () => (
  <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:justify-between">
    <Group legend="Student">
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <LabelInputContainer>
          <Label htmlFor="s_firstname">First name</Label>
          <Input
            id="s_firstname"
            name="s_firstname"
            autoComplete="given-name"
            placeholder="Jane"
            type="text"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="s_lastname">Last name</Label>
          <Input
            id="s_lastname"
            name="s_lastname"
            autoComplete="family-name"
            placeholder="Doe"
            type="text"
            required
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer>
        <Label htmlFor="s_addr">Address</Label>
        <Input
          id="s_addr"
          name="s_addr"
          autoComplete="street-address"
          placeholder="1 Example Street, Sydney NSW"
          type="text"
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="s_school">School</Label>
        <Input
          id="s_school"
          name="s_school"
          placeholder="Example High School"
          type="text"
          required
        />
      </LabelInputContainer>
      <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
        <SchoolYearField id="s_yr" />
        <LabelInputContainer>
          <Label htmlFor="s_post">Postcode</Label>
          <Input
            id="s_post"
            name="s_post"
            autoComplete="postal-code"
            placeholder="2121"
            type="text"
            inputMode="numeric"
            pattern="[0-9]{4}"
            title="Four digits, e.g. 2121"
            minLength={4}
            maxLength={4}
            required
          />
        </LabelInputContainer>
      </div>
      <LabelInputContainer>
        <Label htmlFor="s_mobile">Mobile Number</Label>
        <Input
          id="s_mobile"
          name="s_mobile"
          autoComplete="tel"
          placeholder="0412 345 678"
          type="tel"
          required
        />
      </LabelInputContainer>
      <LabelInputContainer>
        <Label htmlFor="s_email">Email Address</Label>
        <Input
          id="s_email"
          name="s_email"
          autoComplete="email"
          placeholder="example@email.com"
          type="email"
          required
        />
      </LabelInputContainer>
    </Group>

    <div className="flex flex-col justify-between gap-8">
      <Group legend="First parent/guardian">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="p_firstname">First name</Label>
            <Input
              id="p_firstname"
              name="p_firstname"
              placeholder="John"
              type="text"
              required
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="p_lastname">Last name</Label>
            <Input
              id="p_lastname"
              name="p_lastname"
              placeholder="Doe"
              type="text"
              required
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="p_mobile">Mobile Number</Label>
          <Input
            id="p_mobile"
            name="p_mobile"
            placeholder="0412 345 678"
            type="tel"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="p_email">Email Address</Label>
          <Input
            id="p_email"
            name="p_email"
            placeholder="example@email.com"
            type="email"
            required
          />
        </LabelInputContainer>
      </Group>

      <Group legend="Second parent/guardian (optional)">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="p2_firstname">First name</Label>
            <Input
              id="p2_firstname"
              name="p2_firstname"
              placeholder="Jane"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="p2_lastname">Last name</Label>
            <Input
              id="p2_lastname"
              name="p2_lastname"
              placeholder="Doe"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="p2_mobile">Mobile Number</Label>
          <Input
            id="p2_mobile"
            name="p2_mobile"
            placeholder="0412 345 678"
            type="tel"
          />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="p2_email">Email Address</Label>
          <Input
            id="p2_email"
            name="p2_email"
            placeholder="example@email.com"
            type="email"
          />
        </LabelInputContainer>
      </Group>
    </div>
  </div>
);

/**
 * A labelled group of fields. These used to be plain italic paragraphs, so a
 * screen reader announced a dozen unrelated "First name" / "Last name" fields
 * with no indication of who each one was about.
 */
const Group = ({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) => (
  <fieldset className="flex flex-col gap-4 border-none p-0 m-0 min-w-0">
    <legend className="italic mb-2 text-neutral-700 dark:text-neutral-300">
      {legend}
    </legend>
    {children}
  </fieldset>
);

/** A list beats a free number field: there are exactly seven valid answers. */
const SchoolYearField = ({ id }: { id: string }) => (
  <LabelInputContainer>
    <Label htmlFor={id}>School year</Label>
    <div>
      <select
        id={id}
        name={id}
        required
        defaultValue=""
        className="flex h-10 w-full rounded-xs border border-hairline bg-white px-3 py-2 text-sm transition-colors duration-200 hover:border-neutral-400 focus-visible:border-accent-brand focus-visible:ring-1 focus-visible:ring-accent-brand focus-visible:outline-none dark:bg-zinc-900 dark:hover:border-neutral-600"
      >
        <option value="" disabled>
          Select a year
        </option>
        {SCHOOL_YEARS.map((year) => (
          <option key={year} value={`Year ${year}`}>
            Year {year}
          </option>
        ))}
      </select>
    </div>
  </LabelInputContainer>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
