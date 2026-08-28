import SitePage from "../SitePage";
import { sectionMetadata } from "@/lib/metadata";

// Serves the full scrolling page, opened on the classes section. See lib/sections.ts.
export const metadata = sectionMetadata("classes");

const Page = () => <SitePage section="classes" />;

export default Page;
