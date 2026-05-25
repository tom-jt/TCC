import { Megaphone } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { CarouselItem } from "./ui/carousel";

const NoticeboardAnnouncement = () => {
  return (
    <CarouselItem className="basis-1/3">
      <SpotlightCard
        className="bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-4 h-48 border-none"
        spotlightColor="rgba(255, 0, 0, 0.3)"
      >
        <h3 className="text-lg md:text-2xl max-w-4xl flex gap-4">
          <Megaphone /> Group Lessons
        </h3>
        <h3 className="text-md md:text-lg">
          <em>Saturday, 24 January 2026</em>
        </h3>
        <p className="text-sm md:text-base max-w-sm">
          Lessons for Term 2 begin XX/XX/XXXX.
        </p>
      </SpotlightCard>
    </CarouselItem>
  );
};

export default NoticeboardAnnouncement;
