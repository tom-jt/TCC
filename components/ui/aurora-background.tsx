"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useRef } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const auroraRef = useRef<HTMLDivElement>(null);

  // The hero is one screen tall at the very top of a very long page, so for
  // most of a visit the aurora animates somewhere nobody can see. Browsers do
  // not reliably stop compositing an off-screen animation, so stop it here.
  useEffect(() => {
    const element = auroraRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("aurora--paused", !entry.isIntersecting);
      },
      { rootMargin: "64px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    // A plain div, not <main>: this only wraps the hero, and the page's real
    // <main> landmark lives in SitePage around all of the content.
    <div className="flex w-full">
      <div
        className={cn(
          "transition-bg relative flex h-full w-full flex-col items-center justify-center bg-zinc-50 dark:bg-black",
          className,
        )}
        {...props}
      >
        {/* Decorative, and behind the content. `.aurora` is pointer-events-none:
            an overlay here once swallowed every click on the hero's buttons. */}
        <div ref={auroraRef} aria-hidden="true" className="aurora">
          <div
            className={cn(
              "aurora__layer",
              showRadialGradient && "aurora-masked",
            )}
          />
        </div>

        {children}
      </div>
    </div>
  );
};
