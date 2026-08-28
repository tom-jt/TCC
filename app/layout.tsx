import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/app/globals.css";
import { ThemeSync } from "@/components/ThemeSync";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Required for canonical URLs, the sitemap and the share image to resolve to
  // absolute URLs. Set NEXT_PUBLIC_SITE_URL in the hosting environment.
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    "maths tutoring Epping",
    "HSC maths tutor",
    "Extension 2 Mathematics",
    "Extension 1 Mathematics",
    "Advanced Mathematics",
    "Year 12 maths coaching",
    "Epping NSW tutoring",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    url: siteUrl,
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  },
};

// Applies the saved theme before first paint so dark-mode visitors don't see a
// flash of the light theme while React hydrates.
const themeScript = `
try {
  var stored = localStorage.getItem("theme");
  var dark = stored ? stored === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${merriweather.variable} ${merriweather.className} antialiased`}
      >
        <ThemeSync />
        <OrganizationJsonLd />
        {children}
      </body>
    </html>
  );
}
