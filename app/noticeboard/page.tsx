import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the noticeboard section. See lib/sections.ts.
export const metadata = sectionMetadata("noticeboard");

const Page = () => <SitePage section="noticeboard" />;

export default Page;
