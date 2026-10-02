"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A plain text input.
 *
 * The previous version wrapped every field in a motion div that tracked the
 * pointer and painted a blue radial gradient behind the border. Across a
 * sixteen-field enrolment form that was a lot of motion for no information, so
 * it is now a hairline border and an accent focus ring.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xs border border-hairline bg-white px-3 py-2 text-sm",
          "transition-colors duration-200 placeholder:text-neutral-400",
          "hover:border-neutral-400 dark:hover:border-neutral-600",
          "focus-visible:border-accent-brand focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-brand",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-zinc-900 dark:placeholder-neutral-600",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
