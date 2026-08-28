"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  header,
}: {
  data: TimelineEntry[];
  header?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measured continuously, not just on mount: the height changes when the web
  // font swaps in, when images finish loading and whenever the window resizes,
  // and a stale measurement leaves the progress beam the wrong length.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      {header}

      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-1/2 self-start md:w-60 lg:w-72 shrink-0">
              <div className="h-10 absolute left-3 md:left-3 w-10 bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rotate-45 border border-neutral-400 bg-zinc-50 dark:border-neutral-600 dark:bg-zinc-950" />
              </div>
              <h3 className="hidden md:block text-left md:pl-16 md:text-2xl lg:text-3xl font-bold text-balance text-neutral-700 dark:text-neutral-200">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-700 dark:text-neutral-200">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-px bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-300 dark:via-neutral-700 to-transparent to-99% mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-20 w-px bg-linear-to-t from-accent-brand to-transparent from-[0%] via-[18%]"
          />
        </div>
      </div>
    </div>
  );
};
