import { PinContainer } from "@/components/ui/3d-pin";
import Image from "next/image";
import contactContent from "@/data/contact.json";
import generalContent from "@/data/general.json";
import type { ContactContent, GeneralContent } from "@/data/types";
import { Fragment } from "react";

const contact: ContactContent = contactContent;
const general: GeneralContent = generalContent;

const Lines = ({ lines }: { lines: string[] }) => (
  <span className="text-right">
    {lines.map((line, index) => (
      <Fragment key={index}>
        {index > 0 && <br />}
        {line}
      </Fragment>
    ))}
  </span>
);

const Contact = () => {
  return (
    <div
      id="contact"
      className="bg-zinc-100 dark:bg-black w-full py-12 px-6 md:px-12 xl:px-20 gap-8 z-10 flex max-lg:flex-col justify-between items-center shadow-2xl"
    >
      <div className="flex max-lg:flex-col justify-between items-center xl:gap-12 gap-4">
        <PinContainer title="View on map" href={contact.mapUrl}>
          <div className="w-60 h-60">
            <Image
              src={contact.buildingPhoto}
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
            <Lines lines={contact.address} />
          </span>

          <div className="bg-neutral-300 dark:bg-neutral-700 w-full h-0.5"></div>

          <span>
            <em>Mobile</em>
            <Lines lines={contact.mobile} />
          </span>

          <div className="bg-neutral-300 dark:bg-neutral-700 w-full h-0.5"></div>

          <span>
            <em>WeChat</em>
            <Lines lines={contact.wechat} />
          </span>

          <div className="bg-neutral-300 dark:bg-neutral-700 w-full h-0.5"></div>

          <span className="gap-4">
            <em>Email</em>
            <span className="text-right">{contact.email}</span>
          </span>
        </div>
      </div>

      <div className="flex gap-4 md:gap-8 h-full items-center justify-center shrink-0">
        <Image
          src={general.logo}
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
