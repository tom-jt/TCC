import NoticeboardAnnouncement from "@/components/NoticeboardAnnouncement";
import SectionHeading from "@/components/SectionHeading";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { IconQuoteFilled } from "@tabler/icons-react";
import Image from "next/image";
import Frame from "@/components/Frame";
import content from "@/data/noticeboard.json";
import type { NoticeboardContent } from "@/data/types";

const noticeboard: NoticeboardContent = content;

const Noticeboard = () => {
  return (
    <section id="noticeboard" data-section tabIndex={-1}>
      <div className="flex flex-col md:flex-row w-full gap-8 md:gap-24 justify-center items-center">
        <Frame className="shrink-0">
          <Image
            src={noticeboard.principalPhoto}
            alt={`${noticeboard.principalAttribution.replace(/^[–-]\s*/, "")}, principal of Target Coaching College`}
            width={315}
            height={472}
            sizes="200px"
            className="w-50 object-cover"
          />
        </Frame>
        {/* Height comes from the quote, not a fixed h-24 — a real two- or
            three-line quote used to overflow the box. */}
        <div className="flex items-stretch gap-4 min-h-24">
          <div className="rule-v shrink-0" />
          <blockquote className="text-sm md:text-base max-w-sm flex flex-col justify-center gap-1">
            <IconQuoteFilled size={18} className="text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
            <p className="italic">{noticeboard.principalQuote}</p>
            <cite className="text-right not-italic text-neutral-700 dark:text-neutral-300">
              {noticeboard.principalAttribution}
            </cite>
          </blockquote>
        </div>
      </div>

      {noticeboard.notices.length > 0 && (
        <>
          <SectionHeading className="pt-36">Noticeboard</SectionHeading>

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
    </section>
  );
};

export default Noticeboard;
