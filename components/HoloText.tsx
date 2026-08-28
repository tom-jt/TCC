"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export interface HoloLine {
  text: string;
  /** Set where a line is not in the document language, e.g. "zh". */
  lang?: string;
}

interface HoloTextProps {
  lines: HoloLine[];
  className?: string;
}

/**
 * Heading text that lights up under the cursor, the way the grid behind it
 * does.
 *
 * Each character carries two custom properties. `--hue` is fixed at render
 * time: characters early in a line lean towards --accent-brand and late ones
 * towards --accent-brand-3, so a lit word runs through the same spectrum,
 * left to right, that the sheen runs through when it crosses the grid.
 * `--lit` is written by the pointer handler and is simply how close the cursor
 * is, 0 to 1. The colour is a mix of the two.
 *
 * The falloff radius is --halo-radius, the same property the grid's lens is
 * sized from, so the letters and the ruling under them brighten together
 * instead of on two unrelated schedules.
 *
 * Nothing eases in JavaScript here. The colour and its bloom are transitioned
 * in CSS, so the handler only has to write a target number per character per
 * frame and let the transition catch up. That is also why letters keep
 * settling correctly once the pointer stops and the handler stops firing.
 */

/** Only used if --halo-radius cannot be read. */
const RADIUS_FALLBACK = 250;

/** Writes below this are skipped — invisible, and each one costs a restyle. */
const EPSILON = 0.02;

/** Split so words still wrap as words; see the nowrap span in the markup. */
const words = (text: string) => text.split(" ");

export const HoloText = ({ lines, className }: HoloTextProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Without hover there is no cursor to be near, so bind nothing at all.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    const chars = Array.from(
      root.querySelectorAll<HTMLElement>(".holo-char"),
    ).map((element) => ({ element, x: 0, y: 0, lit: 0 }));
    if (!chars.length) return;

    let radius = RADIUS_FALLBACK;
    let rootBox = root.getBoundingClientRect();

    // Two levels of invalidation, because scrolling and resizing do different
    // damage. Character centres are held relative to the root, so a scroll
    // moves the root's box and leaves every character where it was; only a
    // resize or a font swap actually moves them within it. Collapsing the two
    // would re-measure thirty character boxes on every scroll event.
    let boxStale = false;
    let charsStale = true;

    const markBoxStale = () => {
      boxStale = true;
    };
    const markAllStale = () => {
      boxStale = true;
      charsStale = true;
    };

    // Reads only — no interleaved writes, so the browser can serve all of them
    // from a single layout pass.
    const measure = () => {
      rootBox = root.getBoundingClientRect();
      boxStale = false;

      if (!charsStale) return;
      charsStale = false;

      for (const char of chars) {
        const box = char.element.getBoundingClientRect();
        char.x = box.left - rootBox.left + box.width / 2;
        char.y = box.top - rootBox.top + box.height / 2;
      }
      radius =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--halo-radius",
          ),
        ) || RADIUS_FALLBACK;
    };

    let clientX = 0;
    let clientY = 0;
    let frame = 0;

    const paint = () => {
      frame = 0;
      if (boxStale || charsStale) measure();

      const px = clientX - rootBox.left;
      const py = clientY - rootBox.top;

      for (const char of chars) {
        const dx = px - char.x;
        const dy = py - char.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Squared falloff rather than linear: linear leaves a wide skirt of
        // half-lit characters that reads as the whole heading having changed
        // colour, instead of as light landing on part of it.
        const near = Math.max(0, 1 - distance / radius);
        const lit = near * near;

        if (Math.abs(lit - char.lit) < EPSILON) continue;
        char.lit = lit;
        char.element.style.setProperty("--lit", lit.toFixed(3));
      }
    };

    const handleMove = (event: PointerEvent) => {
      clientX = event.clientX;
      clientY = event.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    // The pointer leaving the window stops firing move events, which would
    // otherwise leave whatever it was last near stuck alight.
    const handleOut = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      for (const char of chars) {
        char.lit = 0;
        char.element.style.setProperty("--lit", "0");
      }
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handleOut);
    window.addEventListener("blur", handleOut);
    window.addEventListener("resize", markAllStale);
    window.addEventListener("scroll", markBoxStale, { passive: true });

    // Web fonts land after first paint and reflow every character with them,
    // so the positions measured before that are wrong by a few pixels.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) markAllStale();
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handleMove);
      document.documentElement.removeEventListener("pointerleave", handleOut);
      window.removeEventListener("blur", handleOut);
      window.removeEventListener("resize", markAllStale);
      window.removeEventListener("scroll", markBoxStale);
    };
  }, [lines]);

  return (
    <span ref={rootRef} className={cn("holo-text", className)}>
      {lines.map((line, lineIndex) => {
        // Position along the line, used only to pick the character's hue.
        let index = 0;
        const span = Math.max(line.text.length - 1, 1);

        return (
          <React.Fragment key={line.text}>
            {lineIndex > 0 && <br />}

            {/* A screen reader gets the line whole. The characters beside it
                are decoration, and read out one at a time they are noise. The
                lang attribute rides on this copy, so pronunciation survives the
                split. */}
            <span className="sr-only" lang={line.lang}>
              {line.text}
            </span>

            <span aria-hidden="true" lang={line.lang}>
              {words(line.text).map((word, wordIndex) => {
                const rendered = (
                  // Characters are separate inline elements, so without this a
                  // line could break in the middle of a word.
                  <span className="whitespace-nowrap" key={`${word}-${index}`}>
                    {Array.from(word).map((character, charIndex) => {
                      const t = index++ / span;

                      // Two halves of the sweep: brand to brand-2, then
                      // brand-2 to brand-3. --m is the position within whichever
                      // half this character falls in.
                      const firstHalf = t <= 0.5;
                      const m = firstHalf ? t * 2 : (t - 0.5) * 2;

                      return (
                        <span
                          key={charIndex}
                          className={cn(
                            "holo-char",
                            firstHalf ? "holo-char--low" : "holo-char--high",
                          )}
                          style={
                            { "--m": m.toFixed(3) } as React.CSSProperties
                          }
                        >
                          {character}
                        </span>
                      );
                    })}
                  </span>
                );

                // The space between words is not a character and gets no span:
                // nothing to light, and one less element to measure.
                index += 1;
                return wordIndex === 0 ? (
                  rendered
                ) : (
                  <React.Fragment key={`gap-${wordIndex}`}>
                    {" "}
                    {rendered}
                  </React.Fragment>
                );
              })}
            </span>
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default HoloText;
