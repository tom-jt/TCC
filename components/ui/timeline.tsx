"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import SpotlightCard from "../SpotlightCard";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="flex justify-between gap-4">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-lg md:text-4xl text-black dark:text-white max-w-4xl">
            Class Arrangement
          </h2>
          <h3 className=" text-neutral-700 dark:text-neutral-300 text-lg md:text-xl">
            <em>2026 Term 1</em>
            <br />
            Saturday 24 January 2026 &ndash; Friday 3 April 2026
          </h3>
        </div>

        <SpotlightCard
          className="bg-zinc-100 dark:bg-neutral-800 flex flex-col gap-4 border-none"
          spotlightColor="rgba(255, 229, 0, 0.4)"
        >
          <div className="text-sm text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Graded classes based on exams.
          </div>
          <div className="text-sm text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Termly exams with feedback and performance reports.
          </div>
          <div className="text-sm text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Teaching materials tailored for accelerated learning.
          </div>
          <div className="text-sm text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Critically marked homework.
          </div>
          <div className="text-sm text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Weekly quizzes to reinforce prior learning.
          </div>
          <div className="text-xs text-neutral-700 md:text-lg dark:text-neutral-300">
            ⭐ Additional 1-on-1 lessons can be organised.
          </div>
        </SpotlightCard>
      </div>

      <div ref={ref} className="relative pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-10 items-center top-1/2 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-zinc-50 dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl text-left md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
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
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-0.5 bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-20 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
