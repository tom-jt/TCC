import type { Metadata } from "next";
import { Merriweather } from "next/font/google";
import "@/app/globals.css";
import { ThemeSync } from "@/components/ThemeSync";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Target Coaching College",
  description: "High School Mathematics Specialists at Epping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${merriweather.className} text-justify antialiased`}>
        <ThemeSync />
        {children}
      </body>
    </html>
  );
}
