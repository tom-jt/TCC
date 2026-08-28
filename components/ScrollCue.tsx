"use client";

import Link from "next/link";
import { scrollToId } from "@/components/util";
import { getSection } from "@/lib/sections";

/**
 * Tells the visitor there is a page below the hero.
 *
 * The hero is a full screen with nothing at its lower edge, so on a laptop it
 * reads as the whole site. This is the only thing on it that says otherwise.
 *
 * A real link to the first section rather than a decorative flourish: it can be
 * tabbed to, opened in a new tab, and it still points somewhere with JavaScript
 * off. The click handler only turns the navigation into a scroll — scrollToId
 * takes care of the address bar and moving focus along with it.
 */
const NEXT_SECTION = "noticeboard";

const ScrollCue = () => {
  const next = getSection(NEXT_SECTION);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // Leave modified clicks alone so the browser can open them in a new tab.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0)
      return;

    event.preventDefault();
    scrollToId(NEXT_SECTION);
  };

  return (
    <Link
      href={next?.path ?? `/${NEXT_SECTION}`}
      prefetch={false}
      onClick={handleClick}
      className="scroll-cue"
      aria-label={`Scroll down to ${next?.title ?? "the rest of the page"}`}
    >
      <span aria-hidden="true" className="scroll-cue__rail">
        <span className="scroll-cue__spark" />
      </span>

      <svg
        aria-hidden="true"
        focusable="false"
        className="scroll-cue__chevron"
        viewBox="0 0 18 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1 1l8 8 8-8" />
      </svg>
    </Link>
  );
};

export default ScrollCue;
