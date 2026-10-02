import { cn } from "@/lib/utils";
import React from "react";

interface FrameProps extends React.PropsWithChildren {
  /** Applied to the outer frame, so callers size the frame, not the photo. */
  className?: string;
}

/**
 * A matted double frame for photographs.
 *
 * Two accent lines with 8px of ground between them: a 2px outer rule and a 1px
 * inner one sitting directly on the image edge. The gap is what makes it read
 * as framing rather than as a border — a line flush against a photograph looks
 * like a mistake, the same line held off it looks intentional.
 *
 * Both levels are flex containers so the frame passes its own height straight
 * through to the image. Without that, a frame stretched by a fixed-height row
 * leaves the inner box auto-height, `h-full` on the photo resolves to `auto`,
 * and a portrait image renders at full length and overflows the section.
 */
const Frame = ({ children, className = "" }: FrameProps) => {
  return (
    <div
      className={cn(
        "flex rounded-xs border-2 border-accent-brand/55 p-2",
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 rounded-xs border border-accent-brand/30">
        {children}
      </div>
    </div>
  );
};

export default Frame;
