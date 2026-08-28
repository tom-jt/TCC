/**
 * Absolute origin the site is served from.
 *
 * Needed for canonical URLs, the sitemap and social share images — relative
 * URLs are not valid in any of those. Set NEXT_PUBLIC_SITE_URL in the hosting
 * environment (Vercel, Netlify, etc.); the fallback only keeps local builds
 * working and is not correct for production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteName = "Target Coaching College";
export const siteNameZh = "高老师补习学校";
export const siteDescription =
  "High School Mathematics Specialists at Epping. Small graded classes and 1-on-1 tutoring in Advanced, Extension 1 and Extension 2 Mathematics for Years 6–12.";

/**
 * Endpoint the enrolment and enquiry forms POST to.
 *
 * Any service that accepts a JSON POST works — Formspree, Web3Forms, Basin, or
 * a route of your own. When it is unset the forms fall back to opening the
 * visitor's mail client, which is not reliable on mobile, so setting this is
 * strongly recommended before the site goes live.
 */
export const enquiryEndpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";
