import { Megaphone } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { CarouselItem } from "./ui/carousel";
import type { Notice } from "@/data/types";

const NoticeboardAnnouncement = ({ title, date, body }: Notice) => {
  return (
    <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
      <SpotlightCard
        className="bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-4 min-h-48 border-none"
        spotlightColor="rgba(255, 0, 0, 0.3)"
      >
        <h3 className="text-lg md:text-2xl max-w-4xl flex gap-4">
          <Megaphone /> {title}
        </h3>
        <h3 className="text-base md:text-lg text-left">
          <em>{date}</em>
        </h3>
        <p className="text-sm md:text-base max-w-sm">{body}</p>
      </SpotlightCard>
    </CarouselItem>
  );
};

export default NoticeboardAnnouncement;
