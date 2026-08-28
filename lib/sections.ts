/**
 * The one place that knows what sections exist and what URL each answers to.
 *
 * The site is a single scrolling page, but every section also has a real,
 * crawlable route. Visiting /classes serves the same page and jumps straight to
 * that section, and scrolling updates the address bar to match — so any part of
 * the page can be linked to, shared or bookmarked on its own.
 *
 * The navbar, the sitemap, the per-route metadata and the scroll/URL sync are
 * all driven from this list. Adding a section here is enough for it to appear
 * in all four.
 */
export interface SiteSection {
  /** DOM id of the section element, and the key used everywhere else. */
  id: string;
  /** Route that deep-links to this section. */
  path: string;
  /** Label in the navbar. Sections without one are reachable but not listed. */
  nav?: string;
  /** <title> used when this section's route is the entry point. */
  title: string;
  description: string;
}

export const SECTIONS: SiteSection[] = [
  {
    id: "home",
    path: "/",
    title: "Target Coaching College",
    description:
      "High School Mathematics Specialists at Epping. Small graded classes and 1-on-1 tutoring in Advanced, Extension 1 and Extension 2 Mathematics for Years 6–12.",
  },
  {
    id: "noticeboard",
    path: "/noticeboard",
    nav: "Noticeboard",
    title: "Noticeboard",
    description:
      "Term dates, lesson start dates and the latest announcements from Target Coaching College in Epping.",
  },
  {
    id: "classes",
    path: "/classes",
    nav: "Classes",
    title: "Classes and Timetable",
    description:
      "Group and 1-on-1 mathematics classes for Years 6–12, with the current term timetable for each year group.",
  },
  {
    id: "holiday",
    path: "/holiday",
    nav: "Holiday",
    title: "Holiday Program",
    description:
      "One-week intensive holiday courses and supervised mock exams, running in the first week of each school holiday.",
  },
  {
    id: "results",
    path: "/results",
    nav: "Results",
    title: "Student Results",
    description:
      "HSC results achieved by Target Coaching College students — state ranks, ATAR, and Extension 2, Extension 1 and Advanced Mathematics marks.",
  },
  {
    id: "enrol",
    path: "/enrol",
    title: "Enrol",
    description:
      "Enquire about a place or send a full enrolment request to Target Coaching College in Epping.",
  },
  {
    id: "contact",
    path: "/contact",
    title: "Contact Us",
    description:
      "Address, phone, WeChat and email for Target Coaching College, Suite 205 / 3 Carlingford Road, Epping NSW 2121.",
  },
];

export const NAV_SECTIONS = SECTIONS.filter((section) => section.nav);

export const getSection = (id: string) =>
  SECTIONS.find((section) => section.id === id);

export const getSectionByPath = (path: string) =>
  SECTIONS.find((section) => section.path === path);
