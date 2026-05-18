import { Timeline } from "@/components/ui/timeline";
import { User, Users } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import Image from "next/image";
import ClassArrangementBlock from "@/components/ClassArrangementBlock";

const Classes = () => {
  const data = [
    {
      title: "Years 6–8",
      content: <ClassArrangementBlock key="6,7,8" />,
    },
    {
      title: "Years 9–10",
      content: <ClassArrangementBlock key="9,10" />,
    },
    {
      title: "Years 11–12 (2U/3U)",
      content: <ClassArrangementBlock key="2u,3u" />,
    },
    {
      title: "Years 11–12 (4U)",
      content: <ClassArrangementBlock key="4u" />,
    },
  ];

  return (
    <div id="classes">
      <div className="flex flex-col gap-24 pb-20">
        <div className="flex justify-between h-80">
          <div className="flex flex-col justify-between gap-12">
            <h2 className="text-lg md:text-4xl text-black dark:text-white max-w-4xl">
              Our Classes
            </h2>
            <p className=" text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
              We specialise in high-quality mathematics tutoring for students
              from Year 6 to Year 12, supporting learners at all ability levels
              &ndash; from building strong foundations to excelling in advanced
              courses. Our teaching focuses on developing clear understanding,
              confidence, and effective problem-solving skills, rather than rote
              memorisation.
            </p>
          </div>
          <Image
            width={1600}
            height={900}
            src="/placeholders/PlaceholderImage.jpg"
            alt="Teachers and students interacting in classroom"
            className="object-cover w-1/2"
          />
        </div>
        <div className="flex gap-4 justify-between items-center">
          <SpotlightCard
            className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
            spotlightColor="rgba(255, 0, 229, 0.3)"
          >
            <Users size={36} />
            <h3 className="text-lg md:text-2xl text-black dark:text-white max-w-4xl">
              Group Lessons
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
              All lessons are conducted face-to-face in the classroom to
              encourage engagement and direct interaction. For added
              flexibility, lessons are broadcast live, allowing students to
              attend online via Microsoft Teams if they are unable to be
              physically present.
            </p>
          </SpotlightCard>
          <div className="h-64 w-0.5 rounded-full bg-neutral-400 dark:bg-white" />
          <SpotlightCard
            className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
            spotlightColor="rgba(0, 229, 255, 0.3)"
          >
            <User size={36} />
            <h3 className="text-lg md:text-2xl text-black dark:text-white max-w-4xl">
              1-on-1 Lessons
            </h3>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
              We also offer individual one-on-one tutoring, providing
              personalised instruction targeted to the student&apos;s specific
              strengths, challenges, and learning pace. These sessions are ideal
              for focused support, exam preparation, or customised learning
              plans.
            </p>
          </SpotlightCard>
        </div>
      </div>

      {/* Class Arrangement */}
      <Timeline data={data} />
    </div>
  );
};

export default Classes;
