import CopyableValue from "@/components/CopyableValue";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Frame from "@/components/Frame";
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

/** Strips spaces so "0431 138 185" becomes a valid tel: target. */
const telHref = (number: string) => `tel:${number.replace(/\s+/g, "")}`;

const contactLink =
  "hover:underline underline-offset-2 decoration-neutral-400";

const Contact = () => {
  return (
    <footer
      id="contact"
      data-section
      tabIndex={-1}
      className="bg-zinc-100 dark:bg-black w-full py-12 px-6 md:px-12 xl:px-20 gap-8 z-10 flex max-lg:flex-col justify-between items-center shadow-2xl"
    >
      <h2 className="sr-only">Contact us</h2>

      <div className="flex max-lg:flex-col justify-between items-center xl:gap-12 gap-4">
        {/* Was a 3D-perspective card that tilted on hover behind a ring of
            pulsing beacons. A framed photo and a plain link says the same
            thing. */}
        <a
          href={contact.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/map flex flex-col gap-2"
        >
          <Frame className="transition-colors duration-300 group-hover/map:border-accent-brand">
            <Image
              src={contact.buildingPhoto}
              alt={`The Target Coaching College office at ${contact.postal.street}, ${contact.postal.locality}`}
              width={2000}
              height={1333}
              sizes="240px"
              className="w-60 h-60 object-cover"
            />
          </Frame>
          <span className="flex items-center gap-1.5 text-xs text-neutral-600 transition-colors group-hover/map:text-accent-brand dark:text-neutral-400">
            <MapPin size={13} aria-hidden="true" />
            View on map
          </span>
        </a>

        <address className="not-italic flex flex-col gap-4 h-full max-w-sm *:flex *:justify-between *:text-xs md:*:text-sm">
          <span>
            <em>Address</em>
            <Lines lines={contact.address} />
          </span>

          <div className="bg-hairline w-full h-px"></div>

          {/* tel: links — most of this traffic is on a phone, and a number you
              can't tap is a number that has to be memorised and retyped. */}
          <span>
            <em>Mobile</em>
            <span className="text-right">
              {contact.mobile.map((number, index) => (
                <Fragment key={number}>
                  {index > 0 && <br />}
                  <a href={telHref(number)} className={contactLink}>
                    {number}
                  </a>
                </Fragment>
              ))}
            </span>
          </span>

          <div className="bg-hairline w-full h-px"></div>

          <span>
            <em>WeChat</em>
            <span className="text-right">
              {contact.wechat.map((id, index) => (
                <Fragment key={id}>
                  {index > 0 && <br />}
                  <CopyableValue value={id} label={`WeChat ID ${id}`} />
                </Fragment>
              ))}
            </span>
          </span>

          <div className="bg-hairline w-full h-px"></div>

          <span className="gap-4">
            <em>Email</em>
            <a
              href={`mailto:${contact.email}`}
              className={`text-right break-all ${contactLink}`}
            >
              {contact.email}
            </a>
          </span>
        </address>
      </div>

      <div className="flex gap-4 md:gap-8 h-full items-center justify-center shrink-0">
        <Image
          src={general.logo}
          alt=""
          aria-hidden="true"
          className="dark:invert object-contain w-30 xl:w-50 h-full"
          width={500}
          height={500}
          sizes="(min-width: 1280px) 200px, 120px"
        />
        <div className="flex gap-4">
          <span aria-hidden="true" className="rule-v" />
          <p className="font-medium text-xl xl:text-3xl text-neutral-900 dark:text-zinc-50">
            Target
            <br />
            Coaching
            <br />
            College
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
