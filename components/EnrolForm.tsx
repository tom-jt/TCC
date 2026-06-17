"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function EnrolForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <div className="shadow-input m-24 rounded-none bg-zinc-100 p-8 md:rounded-2xl dark:bg-black">
      <h2 className="text-lg md:text-4xl max-w-4xl">Enrol</h2>
      <p className="mt-2">
        We will get in contact with you as soon as possible.
      </p>

      <form className="flex flex-col gap-8 mt-4" onSubmit={handleSubmit}>
        <div className="flex gap-12 justify-between">
          {/* Student details */}
          <div className="flex flex-col gap-4">
            <p className="italic mt-4">Student</p>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="s_firstname">First name</Label>
                <Input
                  id="s_firstname"
                  placeholder="Jane"
                  type="text"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="s_lastname">Last name</Label>
                <Input id="s_lastname" placeholder="Doe" type="text" required />
              </LabelInputContainer>
            </div>
            <LabelInputContainer>
              <Label htmlFor="s_addr">Address</Label>
              <Input
                id="s_addr"
                placeholder="1 Example Street, Sydney NSW"
                type="text"
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="s_school">School</Label>
              <Input
                id="s_school"
                placeholder="Example High School"
                type="text"
                required
              />
            </LabelInputContainer>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
              <LabelInputContainer>
                <Label htmlFor="s_yr">School Year</Label>
                <Input
                  id="s_yr"
                  type="number"
                  placeholder="6–12"
                  min={6}
                  max={12}
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="s_post">Postcode</Label>
                <Input
                  id="s_post"
                  placeholder="0000"
                  type="text"
                  inputMode="numeric"
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
                placeholder="0412 345 678"
                type="tel"
                required
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="s_email">Email Address</Label>
              <Input
                id="s_email"
                placeholder="example@email.com"
                type="email"
                required
              />
            </LabelInputContainer>
          </div>

          {/* Parent details */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <p className="italic mt-4">First parent/guardian</p>
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label htmlFor="p_firstname">First name</Label>
                  <Input
                    id="p_firstname"
                    placeholder="John"
                    type="text"
                    required
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="p_lastname">Last name</Label>
                  <Input
                    id="p_lastname"
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
                  placeholder="0412 345 678"
                  type="tel"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="p_email">Email Address</Label>
                <Input
                  id="p_email"
                  placeholder="example@email.com"
                  type="email"
                  required
                />
              </LabelInputContainer>
            </div>
            <div className="flex flex-col gap-4">
              <p className="italic mt-8">Second parent/guardian</p>
              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                <LabelInputContainer>
                  <Label htmlFor="p2_firstname">First name</Label>
                  <Input id="p2_firstname" placeholder="Jane" type="text" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="p2_lastname">Last name</Label>
                  <Input id="p2_lastname" placeholder="Doe" type="text" />
                </LabelInputContainer>
              </div>
              <LabelInputContainer>
                <Label htmlFor="p_mobile">Mobile Number</Label>
                <Input id="p2_mobile" placeholder="0412 345 678" type="tel" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="p_email">Email Address</Label>
                <Input
                  id="p2_email"
                  placeholder="example@email.com"
                  type="email"
                />
              </LabelInputContainer>
            </div>
          </div>
        </div>

        <button
          className="group/btn cursor-pointer relative h-10 w-full rounded-md bg-linear-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Send enrolment request &nbsp;
          <span className="absolute group-hover/btn:translate-x-20 transition duration-300">
            &rarr;
          </span>
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-300 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-300 group-hover/btn:opacity-100" />
    </>
  );
};

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
