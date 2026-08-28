import { ImageResponse } from "next/og";
import { siteName, siteNameZh } from "@/lib/site";

export const alt = `${siteName} | High School Mathematics Specialists at Epping`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card shown whenever a link to the site is shared — in WeChat, Messenger,
 * a text message or a search result. Without one, every share renders as a
 * blank rectangle.
 *
 * Generated at build time rather than kept as a binary, so it stays in step
 * with the school's name and tagline automatically.
 */
const OpengraphImage = () =>
  new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #2b2112 55%, #4b381b 100%)",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 6,
            borderRadius: 3,
            background: "linear-gradient(to right, #ffd699, #ffe499, #fff8cc)",
            marginBottom: 44,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            marginTop: 12,
            color: "#ffe6b3",
          }}
        >
          {siteNameZh}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            marginTop: 40,
            color: "#a1a1aa",
          }}
        >
          High School Mathematics Specialists · Epping NSW
        </div>
      </div>
    ),
    size,
  );

export default OpengraphImage;
