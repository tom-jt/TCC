import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import { BicepsFlexed, ScrollText } from "lucide-react";
import Image from "next/image";
import Frame from "@/components/Frame";
import content from "@/data/holiday.json";
import type { HolidayContent } from "@/data/types";
import { Fragment } from "react";

const holiday: HolidayContent = content;

const Holiday = () => {
  return (
    <section
      className="flex flex-col gap-24"
      id="holiday"
      data-section
      tabIndex={-1}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-8 md:h-80">
        <div className="flex flex-col justify-center gap-12">
          <SectionHeading>Holiday Program</SectionHeading>
          <p className="text-sm md:text-base max-w-sm">{holiday.intro}</p>
        </div>
        <Frame className="w-full md:w-1/2">
          <Image
            width={1600}
            height={900}
            src={holiday.photo}
            alt={holiday.photoAlt}
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 42vw, 83vw"
            className="object-cover w-full h-full"
          />
        </Frame>
      </div>
      {/* No items-center: it stops the panels stretching, which is what left
          one card taller than the other. Stretch is the default. */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-8">
        <Panel className="flex flex-1 flex-col gap-4">
          <BicepsFlexed
            size={32}
            className="text-accent-brand"
            aria-hidden="true"
          />
          <h3 className="text-xl md:text-2xl max-w-4xl">
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
        </Panel>
        <div className="w-24 h-px md:h-48 md:w-px shrink-0 self-center bg-hairline" />
        <Panel className="flex flex-1 flex-col gap-4">
          <ScrollText
            size={32}
            className="text-accent-brand"
            aria-hidden="true"
          />
          <h3 className="text-xl md:text-2xl max-w-4xl">Mock Exams</h3>
          <p className="text-sm md:text-base max-w-sm">{holiday.mockExams}</p>
        </Panel>
      </div>
    </section>
  );
};

export default Holiday;
