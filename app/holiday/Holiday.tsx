import SpotlightCard from "@/components/SpotlightCard";
import { BicepsFlexed, ScrollText } from "lucide-react";
import Image from "next/image";

const Holiday = () => {
  return (
    <div className="flex flex-col gap-24" id="holiday">
      <div className="flex justify-between h-80">
        <div className="flex flex-col justify-center gap-12">
          <h2 className="text-lg md:text-4xl text-black dark:text-white max-w-4xl">
            Holiday Program
          </h2>
          <p className=" text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            Our holiday intensive program runs on the first week of each school
            holiday (dates vary for the summer break): January, April, July,
            September.
          </p>
        </div>
        <Image
          width={1600}
          height={900}
          src="/placeholders/PlaceholderImage2.jpg"
          alt="Teachers and students interacting in classroom"
          className="object-cover w-1/2"
        />
      </div>
      <div className="flex gap-4 justify-between items-center">
        <SpotlightCard
          className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
          spotlightColor="rgba(0, 0, 229, 0.4)"
        >
          <BicepsFlexed size={36} />
          <h3 className="text-lg md:text-2xl text-black dark:text-white max-w-4xl">
            1-Week Intensive Program
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            Content ranges from both revision of past topics to a head start on
            new topics 1&ndash;2 terms ahead of the pacing at typical high
            schools.
            <br />
            <br />
            Years 6&ndash;10: 2 hours / day
            <br />
            Years 11&ndash;12: 3 hours / day
          </p>
        </SpotlightCard>
        <div className="h-64 w-0.5 rounded-full bg-black dark:bg-white" />
        <SpotlightCard
          className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none"
          spotlightColor="rgba(229, 0, 0, 0.4)"
        >
          <ScrollText size={36} />
          <h3 className="text-lg md:text-2xl text-black dark:text-white max-w-4xl">
            Mock Exams
          </h3>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
            5 sets of timed, supervised exams with hand-crafted papers. Each
            exam will be critically marked and accompanied by a tutorial
            session.
          </p>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Holiday;
