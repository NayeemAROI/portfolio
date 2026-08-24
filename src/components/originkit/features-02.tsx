"use client";

import "./presence-01.css";
import Globe from "@/components/originkit/ui/features-02/globe";
import OrbitControls from "@/components/originkit/ui/features-02/orbit-controls";

/** Asset root — flat files in package assets/. */
const A = "/originkit/features-02";

const METRICS = [
  { value: "100%", label: "Job Success Score on Upwork" },
  { value: "5.0 ★", label: "Client Rating Across All Projects" },
  { value: "7 / 7", label: "Completed Outbound Deployments" },
] as const;

export function Features02() {
  return (
    <section className="relative overflow-hidden bg-term border-t border-term-line px-4 text-term-ink sm:px-6">
      <div
        aria-labelledby="global-presence-heading"
        className="relative mx-auto flex w-full max-w-6xl flex-col items-center py-12 sm:min-h-[720px] sm:py-0"
      >
        <div
          aria-hidden="true"
          className="relative h-96 w-full shrink-0 overflow-hidden sm:absolute sm:inset-x-0 sm:top-0 sm:h-[480px]"
        >
          <div className="absolute inset-0 mask-[linear-gradient(to_bottom,black_0%,black_48%,rgba(0,0,0,0.35)_52%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_48%,rgba(0,0,0,0.35)_72%,transparent_100%)]">
            <div className="pointer-events-none absolute left-1/2 top-60 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(31,165,90,0.15),transparent_70%)] sm:top-80 sm:h-96 sm:w-96" />

            <OrbitControls />

            <div className="pointer-events-auto absolute left-1/2 top-24 size-72 -translate-x-1/2 cursor-grab touch-none active:cursor-grabbing sm:top-40 sm:size-80">
              <div className="relative size-72 sm:size-80">
                <Globe
                  direction="right"
                  dots={{
                    color: "#34d07c",
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
                  oceanColor="#0b0e11"
                  scale={9}
                  initialLatitude={23}
                  initialLongitude={90}
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-term sm:h-28" />
        </div>

        <div className="pointer-events-none relative z-10 flex w-full flex-1 flex-col items-center pt-4 sm:min-h-[720px] sm:pt-96">
          <header className="flex w-full max-w-3xl flex-col items-center gap-3 px-2 text-center -mt-28 sm:mt-0">
            <p className="flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-delivered-bright">
              <img
                alt=""
                aria-hidden="true"
                src={`${A}/globe-icon.svg`}
                width={20}
                height={20}
                className="size-4"
              />
              Global Infrastructure
            </p>

            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <h2
                id="global-presence-heading"
                className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
              >
                Worldwide Outbound & Deliverability
              </h2>

              <p className="max-w-2xl text-sm leading-relaxed text-term-muted sm:text-base">
                Architecting, authenticating, and monitoring high-performance sending infrastructure, Google Workspace / Microsoft 365 environments, and warmup networks for teams across the globe.
              </p>
            </div>
          </header>

          <ul className="pointer-events-auto mt-10 mb-12 grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            {METRICS.map((metric, index) => (
              <li
                key={metric.label}
                className="relative flex flex-col items-center rounded-xl border border-term-line bg-term-surface/70 p-6 text-center backdrop-blur-xs"
              >
                <span className="font-mono text-3xl font-bold text-delivered-bright sm:text-4xl">
                  {metric.value}
                </span>

                <span className="mt-2 text-xs font-medium text-term-muted">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Features02;
