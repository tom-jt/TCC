import SpotlightCard from "@/components/SpotlightCard";
import { BicepsFlexed, ScrollText } from "lucide-react";
import Image from "next/image";
import content from "@/data/holiday.json";
import type { HolidayContent } from "@/data/types";
import { Fragment } from "react";

const holiday: HolidayContent = content;

const Holiday = () => {
  return (
    <div className="flex flex-col gap-24" id="holiday">
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:h-80">
        <div className="flex flex-col justify-center gap-12">
          <h2 className="text-lg md:text-4xl max-w-4xl">Holiday Program</h2>
          <p className="text-sm md:text-base max-w-sm">{holiday.intro}</p>
        </div>
        <Image
          width={1600}
          height={900}
          src={holiday.photo}
          alt="Teachers and students interacting in classroom"
          className="object-cover w-full md:w-1/2 rounded-2xl"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
        <SpotlightCard
          className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
          spotlightColor="rgba(0, 0, 229, 0.3)"
        >
          <BicepsFlexed size={36} />
          <h3 className="text-lg md:text-2xl max-w-4xl">
            1-Week Intensive Program
          </h3>
          <p className="text-sm md:text-base max-w-sm">
            {holiday.intensiveIntro}
            <br />
            <br />
            {holiday.intensiveDetails.map((line, index) => (
              <Fragment key={index}>
                {index > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>
        </SpotlightCard>
        <div className="w-64 h-1 md:h-64 md:w-1 rounded-full bg-neutral-400 dark:bg-zinc-50" />
        <SpotlightCard
          className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
          spotlightColor="rgba(229, 0, 120, 0.3)"
        >
          <ScrollText size={36} />
          <h3 className="text-lg md:text-2xl max-w-4xl">Mock Exams</h3>
          <p className="text-sm md:text-base max-w-sm">{holiday.mockExams}</p>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Holiday;
