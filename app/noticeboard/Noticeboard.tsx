import NoticeboardAnnouncement from "@/components/NoticeboardAnnouncement";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconQuoteFilled } from "@tabler/icons-react";
import Image from "next/image";
import content from "@/data/noticeboard.json";
import type { NoticeboardContent } from "@/data/types";

const noticeboard: NoticeboardContent = content;

const Noticeboard = () => {
  return (
    <div id="noticeboard">
      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-24 justify-center items-center">
        <Image
          src={noticeboard.principalPhoto}
          alt="Principal Profile Photo"
          width="315"
          height="472"
          className="w-50 rounded-2xl object-cover"
        />
        <div className="flex h-24 items-center gap-4">
          <div className="w-1 h-full rounded-full bg-neutral-400 dark:bg-zinc-50" />
          <div className="text-sm md:text-base max-w-sm">
            <IconQuoteFilled />
            <p className="italic">{noticeboard.principalQuote}</p>
            <p className="text-right">{noticeboard.principalAttribution}</p>
          </div>
        </div>
      </div>

      {noticeboard.notices.length > 0 && (
        <>
          <h2 className="pt-36 text-lg md:text-4xl max-w-4xl">Noticeboard</h2>

          <Carousel className="pt-12">
            <CarouselContent>
              {noticeboard.notices.map((notice, index) => (
                <NoticeboardAnnouncement key={index} {...notice} />
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Noticeboard;
