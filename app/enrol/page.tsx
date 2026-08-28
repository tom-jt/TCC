import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the enrol section. See lib/sections.ts.
export const metadata = sectionMetadata("enrol");

const Page = () => <SitePage section="enrol" />;

export default Page;
