import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}: cold email that lands in the primary inbox, not spam`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Required for `output: export`: the image is generated once at build.
export const dynamic = "force-static";

/**
 * Inter latin subsets, vendored as TTF (converted from the inter-ui woff2
 * subsets; see tasks in AUDIT.md). Fonts load from disk: the OG render makes
 * zero network requests, unlike next/og's default font which is fetched from
 * a CDN at build time.
 */
const font = (weight: 400 | 600 | 700) => ({
  name: "Inter",
  data: readFileSync(join(process.cwd(), `src/assets/og/inter-latin-${weight}.ttf`)),
  weight,
  style: "normal" as const,
});

/**
 * Rendered once at build time from the Delivered token system (DESIGN.md):
 * terminal paper, mono report line, one green accent. No external font fetch:
 * satori's bundled sans keeps the build network-free.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0B0E11",
          color: "#E8EDF2",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: "0.18em",
            color: "#828D99",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: "#1F252B",
                color: "#34D07C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              N
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#E8EDF2", fontWeight: 600, letterSpacing: 0 }}>
                {site.name}
              </span>
              <span style={{ fontSize: 20 }}>{site.role.toUpperCase()}</span>
            </div>
          </div>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #1F252B",
              borderRadius: 999,
              padding: "10px 22px",
              fontSize: 22,
              color: "#34D07C",
            }}
          >
            SPF · DKIM · DMARC · PASS
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          <span>Cold email that lands in the</span>
          <span>
            <span style={{ color: "#E8EDF2" }}>primary inbox</span>
            <span style={{ color: "#828D99" }}>, not spam.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #1F252B",
            paddingTop: 28,
            fontSize: 19,
            color: "#828D99",
            letterSpacing: "0.08em",
            whiteSpace: "nowrap",
          }}
        >
          <span>JSS 100% · RATING 5.0 · 7 OF 8 JOBS · ID VERIFIED</span>
          <span style={{ color: "#34D07C" }}>VERIFIED ON UPWORK</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [font(400), font(600), font(700)],
    },
  );
}
