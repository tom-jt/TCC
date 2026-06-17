import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-zinc-100 dark:bg-black w-full py-12 z-10 flex justify-between items-center shadow-2xl"
    >
      <div className="flex justify-between items-center xl:gap-12 gap-4">
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

        <p className="flex flex-col gap-4 h-full max-w-sm *:flex *:justify-between *:text-xs md:*:text-sm">
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
          <span>
            <em>Mobile</em>
            <span className="text-right">
              0431 138 185
              <br />
              0403 755 691
            </span>
          </span>
          <span>
            <em>WeChat</em>
            <span className="text-right">
              TargetCoaching
              <br />
              JamesGaoMaths
            </span>
          </span>
          <span className="gap-4">
            <em>Email</em>
            <span className="text-right">target.coaching@hotmail.com</span>
          </span>
        </p>
      </div>

      <div className="flex gap-8 h-full w-1/3 items-center justify-center">
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
