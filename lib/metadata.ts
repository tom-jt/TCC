import type { Metadata } from "next";
import { getSection } from "./sections";
import { siteName, siteUrl } from "./site";

/**
 * Metadata for a section's own route.
 *
 * Every route serves the same scrolling page, so each one declares a canonical
 * pointing at itself along with a title and description describing the section
 * it opens on. That is what makes a link to /results useful when it is pasted
 * into a message or a search result.
 */
export function sectionMetadata(id: string): Metadata {
  const section = getSection(id);
  if (!section) return {};

  const title = `${section.title} | ${siteName}`;

  // The share image has to be repeated here. Declaring `openGraph` on a page
  // replaces the parent's openGraph wholesale, so without this every section
  // route would share as a blank card while only "/" showed the image.
  const shareImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${siteName} — High School Mathematics Specialists at Epping`,
  };

  return {
    title: section.title,
    description: section.description,
    alternates: { canonical: section.path },
    openGraph: {
      title,
      description: section.description,
      url: `${siteUrl}${section.path}`,
      siteName,
      locale: "en_AU",
      type: "website",
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: section.description,
      images: [shareImage],
    },
  };
}
