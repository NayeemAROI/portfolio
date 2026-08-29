"use client";

import "./presence-01.css";
import Globe from "@/components/originkit/ui/features-02/globe";
import OrbitControls from "@/components/originkit/ui/features-02/orbit-controls";

/** Asset root — flat files in package assets/. */
const A = "/originkit/features-02";

const METRICS = [
  { value: "100%", label: "Increase in Progress Tracking" },
  { value: "50%", label: "Faster Project Completion Rates" },
  { value: "90%", label: "Satisfaction Rate Among Users" },
] as const;

export default function Presence01() {
  return (
    <main className="min-h-screen overflow-hidden bg-black px-4 text-white sm:px-6">
      <section
        aria-labelledby="global-presence-heading"
        className="relative mx-auto flex w-full max-w-295.5 flex-col items-center py-10 sm:min-h-197.5 sm:py-0"
      >
        <div
          aria-hidden="true"
          className="relative h-106 w-full shrink-0 overflow-hidden sm:absolute sm:inset-x-0 sm:top-0 sm:h-126"
        >
          <div className="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_48%,rgba(0,0,0,0.35)_52%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_48%,rgba(0,0,0,0.35)_72%,transparent_100%)]">
            <div className="pointer-events-none absolute left-1/2 top-67 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.10),transparent_70%)] sm:top-92.375 sm:h-82.75 sm:w-82.75" />

            <OrbitControls />

            <div className="pointer-events-auto absolute left-1/2 top-28 size-78 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing sm:top-51 sm:size-82.75">
              <div className="relative size-78 sm:size-82.75">
                <Globe
                  direction="right"
                  dots={{
                    color: "#737373",
                    size: 10,
                    density: 4,
                    allDots: false,
                  }}
                  speed={1}
                  smoothing={0}
                  stopOnHover={false}
                  dragSpeed={5}
                  showOutline={false}
                  showGrid={false}
                  oceanColor="#050505"
                  scale={9}
                  initialLatitude={23}
                  initialLongitude={-23}
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-black sm:h-28" />
        </div>

        <div className="pointer-events-none relative z-10 flex w-full flex-1 flex-col items-center pt-4 sm:min-h-197.5 sm:pt-104">
          <header className="flex w-full max-w-220.5 flex-col items-center gap-4 px-2 text-center -mt-36 sm:mt-0 md:-mt-2">
            <p className="flex items-center gap-1 text-[15px] font-medium leading-normal text-[#adb1b8] sm:text-[17px]">
              <img
                alt=""
                aria-hidden="true"
                src={`${A}/globe-icon.svg`}
                width={22}
                height={22}
                className="size-4.5 sm:size-5.5"
              />
              Global Presence
            </p>

            <div className="flex flex-col items-center gap-4 sm:gap-5">
              <h1
                id="global-presence-heading"
                className="font-tight text-[clamp(2.125rem,8vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.01em] text-balance text-white [text-shadow:0_8px_30px_rgba(255,255,255,0.25),0_4px_8px_rgba(255,255,255,0.05)] ipad-landscape:text-[44px] desktop-sm:text-[clamp(2.125rem,8vw,3.625rem)]"
              >
                Connecting Worldwide Teams
              </h1>

              <p className="max-w-2xl font-medium leading-normal text-balance text-[#9297a0] text-[18px]">
                Empowering teams across the globe to collaborate seamlessly,
                driving innovation and success everywhere.
              </p>
            </div>
          </header>

          <div
            aria-hidden="true"
            className="hidden min-h-10 flex-1 ipad-landscape:block"
          />

          <ul
            aria-label="Key statistics"
            className="pointer-events-auto mt-6 flex w-full flex-col justify-center gap-6 sm:mt-10 sm:flex-row sm:gap-14 lg:gap-20"
          >
            {METRICS.map((m) => (
              <li key={m.label} className="flex flex-col items-center text-center">
                <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {m.value}
                </span>
                <span className="mt-1 text-xs font-medium text-[#adb1b8] sm:text-sm">
                  {m.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
