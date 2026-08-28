import { Clock } from "lucide-react";

interface ClassArrangementBlockProps {
  lessonDuration: string;
  schedule: string[];
}

/**
 * Splits a schedule line into its label and its time.
 *
 * Operators write these as `"Year 7 | Wednesday 4pm"`, but nothing forces the
 * pipe — so a line without one is treated as all time and no label rather than
 * being dropped or mangled.
 */
const splitSlot = (slot: string): { label: string | null; when: string } => {
  const divider = slot.indexOf("|");
  if (divider === -1) return { label: null, when: slot.trim() };

  return {
    label: slot.slice(0, divider).trim() || null,
    when: slot.slice(divider + 1).trim(),
  };
};

/**
 * One year group's class times.
 *
 * These used to be four short lines stacked down the left of a very wide
 * column, leaving most of the timeline's right-hand side empty. As a grid they
 * fill the space and, more to the point, a parent can scan for a day instead of
 * reading a list.
 */
const ClassArrangementBlock = ({
  lessonDuration,
  schedule,
}: ClassArrangementBlockProps) => {
  return (
    <div className="flex flex-col gap-5">
      <p className="flex items-center gap-2 text-sm md:text-base text-neutral-600 dark:text-neutral-400">
        <Clock size={16} className="text-accent-brand" aria-hidden="true" />
        {lessonDuration}
      </p>

      {/* gap-px over a hairline background draws the dividers, so the grid has
          sharp 1px rules instead of each cell carrying its own border. */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px border border-hairline bg-hairline">
        {schedule.map((slot, index) => {
          const { label, when } = splitSlot(slot);

          return (
            <li
              key={index}
              className="flex flex-col gap-1 bg-zinc-50 p-4 dark:bg-zinc-950"
            >
              {label && (
                <span className="text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-500">
                  {label}
                </span>
              )}
              <span className="tabular text-base md:text-lg text-neutral-800 dark:text-neutral-200">
                {when}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClassArrangementBlock;
