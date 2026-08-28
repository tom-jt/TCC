"use client";

import { useEffect } from "react";
import { SECTIONS, getSectionByPath } from "@/lib/sections";

interface SectionRoutingProps {
  /** Section this route is the entry point for, e.g. "classes" for /classes. */
  initialSection?: string;
}

/**
 * Keeps the URL and the scroll position in step on the single-page site.
 *
 * Renders nothing. Three jobs:
 *  1. On a deep link (/classes), jump to that section on arrival.
 *  2. While scrolling, rewrite the address bar to whichever section is on
 *     screen, so the URL is always shareable.
 *  3. On Back/Forward, return to the section that URL points at.
 */
const SectionRouting = ({ initialSection }: SectionRoutingProps) => {
  useEffect(() => {
    if (!initialSection || initialSection === "home") return;

    const element = document.getElementById(initialSection);
    if (!element) return;

    let cancelled = false;

    // "instant", not "auto": "auto" defers to the CSS scroll-behavior, which is
    // smooth, so arriving at /results would scroll the whole page past you
    // before settling. A deep link should just be there.
    const jump = () => {
      if (cancelled) return;
      element.scrollIntoView({ behavior: "instant", block: "start" });
    };

    jump();
    element.focus({ preventScroll: true });

    // One jump on mount isn't enough. Photos and the web font finish loading
    // afterwards and change how tall everything above the target is, which
    // leaves that first jump pointing at the wrong part of the page. Re-run as
    // each of those settles — and stop immediately if the visitor starts
    // scrolling themselves, so we never yank the page out from under them.
    const stop = () => {
      cancelled = true;
    };

    const settleTimer = setTimeout(jump, 400);
    window.addEventListener("load", jump);
    document.fonts?.ready.then(jump);

    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });

    return () => {
      cancelled = true;
      clearTimeout(settleTimer);
      window.removeEventListener("load", jump);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
    };
  }, [initialSection]);

  useEffect(() => {
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (targets.length === 0) return;

    let currentId = "";

    // The margins leave only a thin band across the middle of the viewport, so
    // exactly one section is ever "intersecting" — whichever the visitor is
    // actually looking at.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const { id } = entry.target;
          if (id === currentId) continue;
          currentId = id;

          const section = SECTIONS.find((candidate) => candidate.id === id);
          if (section && window.location.pathname !== section.path) {
            // The query string is carried across rather than dropped. Only the
            // path tracks the scroll position; anything in the query is page
            // state that outlives it — the enrolment form's open tab, for one,
            // which would otherwise be wiped from the address bar the moment
            // the visitor scrolled, leaving the URL describing a form that is
            // not the one on screen.
            //
            // replaceState: scrolling past six sections should not leave six
            // entries in the history for the visitor to back out through.
            const { search, hash } = window.location;
            window.history.replaceState(
              null,
              "",
              `${section.path}${search}${hash}`,
            );
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const section = getSectionByPath(window.location.pathname);
      if (!section) return;

      const element = document.getElementById(section.id);
      element?.scrollIntoView({ behavior: "instant", block: "start" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return null;
};

export default SectionRouting;
