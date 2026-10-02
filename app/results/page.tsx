import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the results section. See lib/sections.ts.
export const metadata = sectionMetadata("results");

const Page = () => <SitePage section="results" />;

export default Page;
