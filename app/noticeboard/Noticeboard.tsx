import NoticeboardAnnouncement from "@/components/NoticeboardAnnouncement";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Noticeboard = () => {
  return (
    <div id="noticeboard">
      <h2 className="text-lg md:text-4xl text-black dark:text-white max-w-4xl">
        Noticeboard
      </h2>

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
