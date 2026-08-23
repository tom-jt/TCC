import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-zinc-100 dark:bg-black w-full py-12 z-10 flex max-lg:flex-col justify-between items-center shadow-2xl"
    >
      <div className="flex max-lg:flex-col justify-between items-center xl:gap-12 gap-4">
        <PinContainer
          title="View on map"
          href="https://maps.app.goo.gl/ocqRdYNigMvPGAYv7"
        >
          <div className="w-60 h-60">
            <Image
              src="/placeholders/PlaceholderBuilding.jpg"
              alt="Office Building Location"
              width="2000"
              height="1333"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
        </PinContainer>

        <div className="flex flex-col gap-4 h-full max-w-sm *:flex *:justify-between *:text-xs md:*:text-sm">
          <span>
            <em>Address</em>
            <span className="text-right">
              Suite 205, Level 2
              <br />
              3 Carlingford Road
              <br />
              (61 Rawson Street)
              <br />
              Epping NSW, 2121
            </span>
          </span>

          <div className="bg-zinc-50 w-full h-0.5"></div>

          <span>
            <em>Mobile</em>
            <span className="text-right">
              0431 138 185
              <br />
              0403 755 691
            </span>
          </span>

          <div className="bg-zinc-50 w-full h-0.5"></div>

          <span>
            <em>WeChat</em>
            <span className="text-right">
              TargetCoaching
              <br />
              JamesGaoMaths
            </span>
          </span>

          <div className="bg-zinc-50 w-full h-0.5"></div>

          <span className="gap-4">
            <em>Email</em>
            <span className="text-right">target.coaching@hotmail.com</span>
          </span>
        </div>
      </div>

      <div className="flex gap-4 md:gap-8 h-full items-center justify-center shrink-0">
        <Image
          src="/icons/Logo.png"
          alt="Target Coaching College Logo"
          className="dark:invert object-contain w-30 xl:w-50 h-full"
          width={500}
          height={500}
        />
        <h2 className="font-medium text-xl xl:text-3xl border-l-4 rounded border-black dark:border-white px-4">
          Target
          <br />
          Coaching
          <br />
          College
        </h2>
      </div>
    </div>
  );
};

export default Contact;
