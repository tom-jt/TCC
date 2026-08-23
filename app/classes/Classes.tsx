import { Timeline } from "@/components/ui/timeline";
import { User, Users } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";
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
        <h2 className="text-lg md:text-4xl max-w-4xl">Class Arrangement</h2>
        <h3 className="text-base md:text-lg">
          <em>{classes.termLabel}</em>
          <br />
          {classes.termDates}
        </h3>
      </div>

      <SpotlightCard
        className="w-full md:w-1/2 bg-zinc-100 dark:bg-neutral-900 flex flex-col gap-4 border-none text-sm text-neutral-700 md:text-lg dark:text-neutral-300 text-left *:flex *:gap-2"
        spotlightColor="rgba(255, 229, 0, 0.3)"
      >
        {classes.features.map((feature, index) => (
          <div key={index}>
            <div>⭐</div>
            <div>{feature}</div>
          </div>
        ))}
      </SpotlightCard>
    </div>
  );

  return (
    <div id="classes">
      <div className="flex flex-col gap-24 pb-20">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:h-80">
          <div className="flex flex-col justify-between gap-12">
            <h2 className="text-lg md:text-4xl max-w-4xl">Our Classes</h2>
            <p className="text-sm md:text-base max-w-sm">{classes.intro}</p>
          </div>
          <Image
            width={1600}
            height={900}
            src={classes.photo}
            alt="Teachers and students interacting in classroom"
            className="object-cover w-full md:w-1/2 rounded-2xl"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
          <SpotlightCard
            className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
            spotlightColor="rgba(255, 0, 229, 0.3)"
          >
            <Users size={36} />
            <h3 className="text-lg md:text-2xl max-w-4xl">Group Lessons</h3>
            <p className="text-sm md:text-base max-w-sm">
              {classes.groupLessons}
            </p>
          </SpotlightCard>
          <div className="w-64 h-1 md:h-64 md:w-1 rounded-full bg-neutral-400 dark:bg-zinc-50" />
          <SpotlightCard
            className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
            spotlightColor="rgba(0, 229, 255, 0.3)"
          >
            <User size={36} />
            <h3 className="text-lg md:text-2xl max-w-4xl">1-on-1 Lessons</h3>
            <p className="text-sm md:text-base max-w-sm">
              {classes.individualLessons}
            </p>
          </SpotlightCard>
        </div>
      </div>

      {/* Class Arrangement */}
      <Timeline data={data} header={timelineHeader} />
    </div>
  );
};

export default Classes;
