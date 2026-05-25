import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-zinc-100 dark:bg-black w-full py-24 px-24 z-10 flex justify-around items-center"
    >
      <div className="flex gap-12">
        <PinContainer
          title="View on map"
          href="https://maps.app.goo.gl/ocqRdYNigMvPGAYv7"
        >
          <div className="w-80 h-80">
            <Image
              src="/placeholders/PlaceholderBuilding.jpg"
              alt="Office Building Location"
              width="2000"
              height="1333"
              className="w-80 h-80 rounded-2xl object-cover"
            />
          </div>
        </PinContainer>

        <div className="flex flex-col justify-around min-w-sm max-w-sm">
          <p className="text-sm md:text-base flex justify-between">
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
          </p>

          <p className="text-sm md:text-base flex flex-col gap-4">
            <span className="flex justify-between">
              <em>Mobile</em>
              <span className="text-right">
                0431 138 185
                <br />
                0403 755 691
              </span>
            </span>
            <span className="flex justify-between">
              <em>WeChat</em>
              <span className="text-right">
                TargetCoaching
                <br />
                JamesGaoMaths
              </span>
            </span>
            <span className="flex justify-between">
              <em>Email</em>
              <span className="text-right">target.coaching@hotmail.com</span>
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-8 h-full w-1/3 items-center justify-center">
        <Image
          src="/icons/Logo.png"
          alt="Target Coaching College Logo"
          className="dark:invert object-contain w-1/3 h-full"
          width={1}
          height={1}
        />
        <h2 className="font-medium text-3xl border-l-4 rounded border-black dark:border-white px-4">
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
