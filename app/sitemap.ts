import type { MetadataRoute } from "next";
import { SECTIONS } from "@/lib/sections";
import { siteUrl } from "@/lib/site";

// Every section has a real route, so every section belongs in the sitemap.
const sitemap = (): MetadataRoute.Sitemap =>
  SECTIONS.map((section) => ({
    url: `${siteUrl}${section.path}`,
    changeFrequency: "monthly" as const,
    priority: section.path === "/" ? 1 : 0.7,
  }));

export default sitemap;
