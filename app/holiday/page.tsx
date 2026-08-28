import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the holiday section. See lib/sections.ts.
export const metadata = sectionMetadata("holiday");

const Page = () => <SitePage section="holiday" />;

export default Page;
