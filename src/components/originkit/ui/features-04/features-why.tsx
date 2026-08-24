// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import { FeatureCard, Plate, WideCard } from "@/components/originkit/ui/features-04/cards";
import { CornerBlocks } from "@/components/originkit/ui/features-04/corner-blocks";
import { EdgeDotBands } from "@/components/originkit/ui/features-04/edge-dot-bands";
import { GridColumns, GridRows } from "@/components/originkit/ui/features-04/grid-pattern";
import { ShieldCheck, Star } from "lucide-react";

function asset(file: string) {
  return `/originkit/features-04/${file}`;
}

/** Soft ellipse wash behind the heading on phone/tablet. */
const Glow = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute top-[56px] left-[calc(50%-0.43px)] h-[957px] w-[492px] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] ipad:top-[27px] ipad:left-[calc(50%+15.21px)] ipad:w-[689px] desktop-sm:hidden"
  />
);

/** Desktop wash — covers the grid below the heading. */
const DesktopGlow = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute top-[-17px] left-1/2 hidden h-[267px] w-[660px] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] desktop-sm:block"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute top-[90px] left-[calc(50%+42px)] hidden h-[1052px] w-[calc(100%+298px)] -translate-x-1/2 rounded-[50%] bg-[#f8f8f8] blur-[26px] desktop-sm:block"
    />
  </>
);

const FEATURES = {
  focus: {
    title: "Authentication",
    body: "SPF, DKIM, DMARC alignment and Custom Return-Path configuration to guarantee emails pass strict authentication checks.",
    art: {
      src: asset("focus.png"),
      alt: "Isometric representation of DNS protocol alignment",
      boxClassName: "h-[166px] w-[180px] ipad:h-[196px] ipad:w-[212px]",
      artClassName:
        "top-[-29.98px] left-[-30.13px] h-[242.3px] w-[242.3px] ipad:top-[-35.4px] ipad:left-[-35.49px] ipad:h-[285.4px] ipad:w-[285.4px]",
    },
  },
  connect: {
    title: "Tool Integration",
    body: "Seamlessly connect Google Workspace, Microsoft 365, Instantly, Apollo, and Clay for high-volume cold outreach.",
    art: {
      src: asset("connect.png"),
      alt: "Interlocking blocks of email infrastructure integration",
      boxClassName: "h-[166px] w-[198px] ipad:h-[196px] ipad:w-[234px]",
      artClassName:
        "top-[-7.55px] left-[7.44px] h-[179.8px] w-[194.2px] ipad:top-[-8.91px] ipad:left-[8.79px] ipad:h-[212.3px] ipad:w-[229.5px]",
    },
  },
  scale: {
    title: "Reputation & Warmup",
    body: "Paced inbox warmup, sender rotation, and spam rate containment to scale cold outbound without getting blacklisted.",
    art: {
      src: asset("scale.png"),
      alt: "Staircase architecture of deliverability scaling",
      boxClassName:
        "h-[166px] w-[173px] ipad:h-[213px] ipad:w-[223px] desktop-sm:h-[271px] desktop-sm:w-[283px]",
      artClassName:
        "top-[-21.83px] left-[-60.63px] h-[209.8px] w-[279.7px] ipad:top-[-28.01px] ipad:left-[-78.15px] ipad:h-[269.2px] ipad:w-[360.5px] desktop-sm:top-[-35.64px] desktop-sm:left-[-99.18px] desktop-sm:h-[342.5px] desktop-sm:w-[457.5px]",
    },
  },
};

export const FeaturesWhy = () => (
  <section className="relative w-full overflow-hidden bg-[#f5f5f2] desktop-sm:bg-[#f8f8f8] border-t border-line">
    <div className="relative mx-auto w-full overflow-hidden pt-[64px] ipad:pt-[96px] desktop-sm:pt-[64px] wide-lg:max-w-[1440px]">
      <GridRows />
      <GridColumns />
      <CornerBlocks />
      <Glow />
      <DesktopGlow />
      <EdgeDotBands />

      <div className="relative mx-auto flex w-[88%] max-w-[1192px] flex-col items-center gap-[32px] pb-[64px] ipad:gap-[48px] ipad:pb-[80px] desktop-sm:gap-[56px] desktop-sm:pb-[72px]">
        <header className="flex w-full flex-col items-center gap-[16px] max-w-2xl text-center">
          <div className="inline-flex items-center gap-[8px] rounded-full border border-line bg-card px-[14px] py-[8px] shadow-2xs">
            <img
              src={asset("flame.svg")}
              alt=""
              className="size-[16px]"
            />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
              Core Capabilities
            </span>
          </div>
          <div className="flex w-full flex-col items-center gap-[10px] text-center text-ink">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-ink">
              Engineered for Inbox Placement
            </h2>
            <p className="font-sans text-sm leading-relaxed text-muted sm:text-base max-w-xl">
              From DNS protocol enforcement to mailbox warmup and rotation, every layer is tuned to protect domain health.
            </p>
          </div>
        </header>

        <div className="flex w-full flex-col gap-[12px] ipad:gap-[16px] desktop-sm:grid desktop-sm:grid-cols-3 desktop-sm:items-stretch">
          <div className="flex flex-col gap-[12px] ipad:flex-row ipad:items-center ipad:gap-[16px] desktop-sm:contents">
            <div className="flex flex-col gap-[12px] ipad:w-[286px] ipad:shrink-0 ipad:gap-[16px] desktop-sm:w-auto">
              <Plate innerClassName="h-[76px] items-center gap-[10px] px-[20px] py-[12px]">
                <div className="flex size-9 items-center justify-center rounded-lg bg-delivered/10 text-delivered-ink">
                  <ShieldCheck className="size-5" />
                </div>
                <p className="font-mono text-sm font-semibold text-ink">
                  100% Upwork Success
                </p>
              </Plate>

              <FeatureCard {...FEATURES.focus} />
            </div>

            <div className="flex flex-col gap-[12px] ipad:flex-1 ipad:gap-[16px]">
              <FeatureCard {...FEATURES.connect} />

              <Plate innerClassName="h-[76px] items-center gap-[12px] px-[20px] py-[12px]">
                <div className="flex size-9 items-center justify-center rounded-lg bg-warm/15 text-warm">
                  <Star className="size-5 fill-warm" />
                </div>
                <p className="font-mono text-sm font-semibold text-ink">
                  5.0 ★ Client Rating
                </p>
              </Plate>
            </div>
          </div>

          <WideCard {...FEATURES.scale} />
        </div>
      </div>
    </div>
  </section>
);
