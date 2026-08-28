import { cn } from "@/lib/utils";
import React from "react";

interface PanelProps extends React.PropsWithChildren {
  className?: string;
}

/**
 * A flat, hairline-bordered card.
 *
 * This replaces SpotlightCard, which tracked the pointer and painted a radial
 * glow under it in a different colour per card — pink here, cyan there, yellow
 * somewhere else. Five accent colours and a mouse-following gradient is a lot
 * of decoration for a page whose job is to state class times clearly.
 *
 * Nothing here needs the client: it is a border, a background and a hover
 * transition, so the whole thing renders on the server.
 */
const Panel = ({ children, className = "" }: PanelProps) => {
  return (
    <div
      className={cn(
        // .panel carries the double-rule hover (globals.css): the outline is
        // declared up front and only its colour and offset animate, so the
        // panel never reflows and the second line appears to grow out of the
        // edge rather than blink into place.
        "panel relative rounded-xs border border-hairline p-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
