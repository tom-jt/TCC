import SpotlightCard from "./SpotlightCard";
import { CarouselItem } from "./ui/carousel";

const NoticeboardAnnouncement = () => {
  return (
    <CarouselItem className="basis-1/3">
      <SpotlightCard
        className="bg-zinc-50 dark:bg-black flex flex-col gap-4 border-none h-48"
        spotlightColor="rgba(255, 0, 0, 0.4)"
      >
        <h3 className="text-lg md:text-2xl text-black dark:text-white max-w-4xl">
          Group Lessons
        </h3>
        <h3 className=" text-neutral-700 dark:text-neutral-300 text-md md:text-lg">
          <em>Saturday, 24 January 2026</em>
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Lessons for Term 2 begin XX/XX/XXXX.
        </p>
      </SpotlightCard>
    </CarouselItem>
  );
};

export default NoticeboardAnnouncement;
