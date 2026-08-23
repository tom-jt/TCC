import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/app/globals.css";
import { ThemeSync } from "@/components/ThemeSync";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

const siteName = "Target Coaching College";
const siteDescription = "High School Mathematics Specialists at Epping";

export const metadata: Metadata = {
  title: siteName,
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${merriweather.className} antialiased`}>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
