import { Timeline } from "@/components/ui/timeline";
import { User, Users } from "lucide-react";
import Panel from "@/components/Panel";
import SectionHeading from "@/components/SectionHeading";
import Image from "next/image";
import Frame from "@/components/Frame";
import ClassArrangementBlock from "@/components/ClassArrangementBlock";
import content from "@/data/classes.json";
import type { ClassesContent } from "@/data/types";

const classes: ClassesContent = content;

const Classes = () => {
  const data = classes.groups.map((group) => ({
    title: group.title,
    content: (
      <ClassArrangementBlock
        lessonDuration={group.lessonDuration}
        schedule={group.schedule}
      />
    ),
  }));

  const timelineHeader = (
    <div className="flex flex-col md:flex-row md:justify-between gap-4">
      <div className="flex flex-col justify-center gap-4">
        <SectionHeading>Class Arrangement</SectionHeading>
        <h3 className="text-base md:text-lg">
          <em>{classes.termLabel}</em>
          <br />
          {classes.termDates}
        </h3>
      </div>

      <Panel className="w-full md:w-1/2 bg-zinc-100/70 dark:bg-neutral-900/50 flex flex-col gap-3 text-sm text-neutral-700 md:text-base dark:text-neutral-300 text-left">
        {classes.features.map((feature, index) => (
          <div key={index} className="flex gap-3">
            {/* A ruled accent tick rather than a ⭐ emoji. */}
            <span aria-hidden="true" className="rule-h mt-2 w-3 shrink-0" />
            <span>{feature}</span>
          </div>
        ))}
      </Panel>
    </div>
  );

  return (
    <section id="classes" data-section tabIndex={-1}>
      <div className="flex flex-col gap-24 pb-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:h-80">
          <div className="flex flex-col justify-between gap-12">
            <SectionHeading>Our Classes</SectionHeading>
            <p className="text-sm md:text-base max-w-sm">{classes.intro}</p>
          </div>
          <Frame className="w-full md:w-1/2">
            <Image
              width={1600}
              height={900}
              src={classes.photo}
              alt={classes.photoAlt}
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 42vw, 83vw"
              className="object-cover w-full h-full"
            />
          </Frame>
        </div>
        {/* No items-center: it stops the panels stretching, which is what left
          one card taller than the other. Stretch is the default. */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <Panel className="flex flex-1 flex-col gap-4">
            <Users size={32} className="text-accent-brand" aria-hidden="true" />
            <h3 className="text-xl md:text-2xl max-w-4xl">Group Lessons</h3>
            <p className="text-sm md:text-base max-w-sm">
              {classes.groupLessons}
            </p>
          </Panel>
          <div className="w-24 h-px md:h-48 md:w-px shrink-0 self-center bg-hairline" />
          <Panel className="flex flex-1 flex-col gap-4">
            <User size={32} className="text-accent-brand" aria-hidden="true" />
            <h3 className="text-xl md:text-2xl max-w-4xl">1-on-1 Lessons</h3>
            <p className="text-sm md:text-base max-w-sm">
              {classes.individualLessons}
            </p>
          </Panel>
        </div>
      </div>

      {/* Class Arrangement */}
      <Timeline data={data} header={timelineHeader} />
    </section>
  );
};

export default Classes;
