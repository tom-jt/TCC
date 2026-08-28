"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";

interface GridFieldBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

/**
 * The hero backdrop: graph paper that catches the light.
 *
 * The rest of the page is already ruled — the ambient graph paper behind every
 * section, the double rules under the headings, the matted frames around the
 * photographs. This is the same paper as the rest of the site, inked harder and
 * given light to catch: the ruling comes from the shared `.ruled` class and the
 * same --rule-minor everything else uses. Graph paper is the literal material
 * of the subject being taught.
 *
 * The holographic part is not a coloured cloud floating over the grid. Each
 * light layer is *masked by the grid itself*, so colour only ever exists inside
 * the rules: a sheen sweeps across and the lines it crosses light up like foil,
 * then go quiet again. Nothing paints in the squares.
 *
 * The cursor gets two responses, deliberately different in character:
 *
 *  - A lens. The grid blooms into full colour around the pointer and falls off
 *    with distance. It follows smoothly, lagging slightly behind, because a
 *    light source that tracks the cursor exactly reads as a UI element rather
 *    than as light. The grid mask stays still and only the light moves, so a
 *    pointer event costs one transform and never a re-rasterised mask.
 *  - A crosshair, which does the opposite: it snaps to the nearest ruling
 *    instead of following freely, the way you would line a point up on graph
 *    paper. The contrast between the two — one soft and trailing, one crisp and
 *    clicking to the grid — is the whole effect.
 *
 * Pointer work is confined to a rAF loop that writes four custom properties and
 * parks itself as soon as the lens has caught up. There is no React state here
 * and nothing re-renders on pointer movement.
 */

/** Only used if --rule-minor cannot be read; see readGridMinor below. */
const GRID_MINOR_FALLBACK = 18;

/** Per-frame fraction of the remaining distance the lens closes. */
const LENS_EASE = 0.14;

/** Below this the lens has arrived and the loop can stop until next move. */
const SETTLED_PX = 0.4;

export const GridFieldBackground = ({
  className,
  children,
  ...props
}: GridFieldBackgroundProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  // The hero is one screen tall at the very top of a very long page, so for
  // most of a visit this animates somewhere nobody can see. Browsers do not
  // reliably stop compositing an off-screen animation, so stop it here.
  useEffect(() => {
    const element = fieldRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("grid-field--paused", !entry.isIntersecting);
      },
      { rootMargin: "64px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const field = fieldRef.current;
    if (!hero || !field) return;

    // Touch and pen get nothing: there is no hover, so a lens would either sit
    // where the last tap landed or chase taps around. Bail before binding
    // anything rather than leaving listeners running for no visible effect.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    // The hero's box, needed to turn client coordinates into field-local ones.
    // Scrolling and resizing invalidate it, but neither recomputes it: they
    // only set a flag, and the read happens at most once per frame inside the
    // rAF loop. Measuring in a scroll handler would put a forced layout on
    // every scroll event of a very long page.
    // Read rather than duplicated as a constant: globals.css narrows the
    // ruling below 640px, and a hard-coded figure here would leave the
    // crosshair snapping to a grid the paper is no longer drawn on.
    const readGridMinor = () =>
      parseFloat(getComputedStyle(field).getPropertyValue("--rule-minor")) ||
      GRID_MINOR_FALLBACK;

    let bounds = hero.getBoundingClientRect();
    let gridMinor = readGridMinor();
    let stale = false;
    const markStale = () => {
      stale = true;
    };

    let clientX = 0;
    let clientY = 0;
    let lensX = 0;
    let lensY = 0;
    let snap = true;
    let frame = 0;

    const setVar = (name: string, px: number) =>
      field.style.setProperty(name, `${px}px`);

    const step = () => {
      if (stale) {
        bounds = hero.getBoundingClientRect();
        gridMinor = readGridMinor();
        stale = false;
      }

      const targetX = clientX - bounds.left;
      const targetY = clientY - bounds.top;

      // First move, or the first after the pointer has been away: put the lens
      // straight onto the cursor. Easing in from wherever it was last would
      // send a light streaking across the hero.
      if (snap) {
        snap = false;
        lensX = targetX;
        lensY = targetY;
      } else {
        lensX += (targetX - lensX) * LENS_EASE;
        lensY += (targetY - lensY) * LENS_EASE;
      }

      setVar("--lens-x", lensX);
      setVar("--lens-y", lensY);

      // The crosshair takes the raw pointer position, not the eased one, and
      // rounds it to the nearest ruling. Easing it too would leave the rules
      // drifting between grid lines on the way to their destination.
      setVar("--cross-x", Math.round(targetX / gridMinor) * gridMinor);
      setVar("--cross-y", Math.round(targetY / gridMinor) * gridMinor);

      const settled =
        Math.abs(targetX - lensX) < SETTLED_PX &&
        Math.abs(targetY - lensY) < SETTLED_PX;

      frame = settled ? 0 : requestAnimationFrame(step);
    };

    const handleMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      field.classList.add("grid-field--lit");
      if (!frame) frame = requestAnimationFrame(step);
    };

    const handleLeave = () => {
      field.classList.remove("grid-field--lit");
      // Re-enter should place the lens under the cursor rather than sweep to
      // it from wherever it was parked when the pointer left.
      snap = true;
    };

    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", handleLeave);
    window.addEventListener("resize", markStale);
    window.addEventListener("scroll", markStale, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("resize", markStale);
      window.removeEventListener("scroll", markStale);
    };
  }, []);

  return (
    // A plain div, not <main>: this only wraps the hero, and the page's real
    // <main> landmark lives in SitePage around all of the content.
    <div className="flex w-full">
      <div
        ref={heroRef}
        className={cn(
          "relative flex h-full w-full flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950",
          className,
        )}
        {...props}
      >
        {/* Decorative, and behind the content. `.grid-field` is
            pointer-events-none: an overlay here once swallowed every click on
            the hero's buttons, which is also why the pointer listeners above go
            on the hero rather than on this. */}
        <div ref={fieldRef} aria-hidden="true" className="grid-field">
          {/* The paper itself. */}
          <div className="grid-field__paper ruled" />

          {/* Ambient sheen: a wide iridescent band crossing the field, showing
              only where it passes over a ruling. */}
          <div className="grid-field__foil ruled-mask">
            <div className="grid-field__foil-light" />
          </div>

          {/* The lens: grid mask on the still parent, the light and its own
              falloff moving inside it. */}
          <div className="grid-field__lens ruled-mask">
            <div className="grid-field__lens-light" />
          </div>

          <div className="grid-field__crosshair" />

          {/* Between the field and the copy, never over it. */}
          <div className="grid-field__scrim" />
        </div>

        {children}
      </div>
    </div>
  );
};
