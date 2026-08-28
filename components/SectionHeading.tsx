import { cn } from "@/lib/utils";
import React from "react";

interface SectionHeadingProps extends React.PropsWithChildren {
  className?: string;
}

/**
 * A section title with a short accent rule above it.
 *
 * The rule is the one place the accent appears at full strength on most
 * screens, and it does a job rather than decorating: it marks where a section
 * starts, which the page previously left entirely to whitespace. It carries
 * the same iridescent sweep as the hero — see `--holo` in globals.css.
 */
const SectionHeading = ({ children, className = "" }: SectionHeadingProps) => {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <span aria-hidden="true" className="rule-h w-10" />
      <h2 className="text-2xl md:text-4xl max-w-4xl">{children}</h2>
    </div>
  );
};

export default SectionHeading;
