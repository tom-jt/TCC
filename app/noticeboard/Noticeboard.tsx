import NoticeboardAnnouncement from "@/components/NoticeboardAnnouncement";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconQuoteFilled } from "@tabler/icons-react";
import Image from "next/image";

const Noticeboard = () => {
  return (
    <div id="noticeboard">
      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-24 justify-center items-center">
        <Image
          src="/images/Principal.jpg"
          alt="Principal Profile Photo"
          width="315"
          height="472"
          className="w-50 rounded-2xl object-cover"
        />
        <div className="flex h-24 items-center gap-4">
          <div className="w-1 h-full rounded-full bg-neutral-400 dark:bg-zinc-50" />
          <div className="text-sm md:text-base max-w-sm">
            <IconQuoteFilled />
            <p className="italic">
              PLACEHOLDER for a very motivational quote here.
            </p>
            <p className="text-right">&ndash; James Gao, Principal</p>
          </div>
        </div>
      </div>
      <h2 className="pt-36 text-lg md:text-4xl max-w-4xl">Noticeboard</h2>

      <Carousel className="pt-12">
        <CarouselContent>
          <NoticeboardAnnouncement />
          <NoticeboardAnnouncement />
          <NoticeboardAnnouncement />
          <NoticeboardAnnouncement />
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Noticeboard;
