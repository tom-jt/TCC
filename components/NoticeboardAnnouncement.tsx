import { Megaphone } from "lucide-react";
import Panel from "./Panel";
import { CarouselItem } from "./ui/carousel";
import type { Notice } from "@/data/types";

const NoticeboardAnnouncement = ({ title, date, body }: Notice) => {
  return (
    <CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
      <Panel className="bg-zinc-100/80 dark:bg-zinc-900/60 flex flex-col gap-3 min-h-48">
        <h3 className="text-lg md:text-2xl max-w-4xl flex items-center gap-3">
          <Megaphone size={20} className="text-accent-brand shrink-0" aria-hidden="true" />
          {title}
        </h3>
        <p className="text-sm md:text-base text-left text-neutral-500 dark:text-neutral-400">
          {date}
        </p>
        <p className="text-sm md:text-base max-w-sm">{body}</p>
      </Panel>
    </CarouselItem>
  );
};

export default NoticeboardAnnouncement;
