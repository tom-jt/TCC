import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the contact section. See lib/sections.ts.
export const metadata = sectionMetadata("contact");

const Page = () => <SitePage section="contact" />;

export default Page;
