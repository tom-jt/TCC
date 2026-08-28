"use client";

import Link from "next/link";
import { scrollToId } from "@/components/util";
import { getSection } from "@/lib/sections";

/**
 * The first thing a visitor can actually *do*.
 *
 * The hero used to be a full screen of title and tagline with no action in it,
 * so every visitor had to work out for themselves that scrolling was the next
 * step. These are real links to the section routes, so middle-click and
 * "open in new tab" behave normally; the click handler just turns the
 * navigation into a scroll.
 */
const HeroActions = () => {
  const handleClick =
    (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      // Leave modified clicks alone so the browser can open them in a new tab.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
        return;

      event.preventDefault();
      scrollToId(id);
    };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
      <Link
        href={getSection("enrol")?.path ?? "/enrol"}
        prefetch={false}
        onClick={handleClick("enrol")}
        className="btn-accent rounded-xs px-6 py-3 text-base font-medium bg-accent-brand text-accent-contrast text-center"
      >
        Enquire about a place
      </Link>
      <Link
        href={getSection("classes")?.path ?? "/classes"}
        prefetch={false}
        onClick={handleClick("classes")}
        className="btn-outline rounded-xs px-6 py-3 text-base font-medium border border-neutral-400 text-neutral-900 dark:border-neutral-600 dark:text-zinc-50 text-center"
      >
        See class times
      </Link>
    </div>
  );
};

export default HeroActions;
