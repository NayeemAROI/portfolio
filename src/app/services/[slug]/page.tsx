import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { services } from "@/data/services";
import { links } from "@/data/links";
import { ProcessRail } from "@/components/ProcessRail";
import { Reveal } from "@/components/Reveal";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return { title: "Service not found" };
  return { title: service.title, description: service.headline };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = services.findIndex((s) => s.id === slug);
  if (index === -1) notFound();

  const service = services[index];
  const prev = services[(index + services.length - 1) % services.length];
  const next = services[(index + 1) % services.length];

  return (
    <>
      <section className="relative overflow-hidden bg-term text-term-ink">
        <div className="term-halo absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 text-center sm:px-6 md:py-16">
          <div className="flex justify-start">
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-term-muted transition-colors hover:text-delivered-bright"
            >
              <ArrowLeft className="size-3.5" />
              All services
            </Link>
          </div>
          <p className="animate-rise mt-6 inline-block rounded border border-term-line bg-term-surface px-2.5 py-1 font-mono text-[11px] tracking-widest text-delivered-bright">
            {service.code}
          </p>
          <h1
            className="animate-rise mx-auto mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            {service.title}
          </h1>
          <p
            className="animate-rise mx-auto mt-4 max-w-2xl text-base text-term-muted sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            {service.headline}
          </p>
          <div
            className="animate-rise mt-6 flex flex-wrap justify-center gap-1.5"
            style={{ animationDelay: "240ms" }}
          >
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-term-line bg-term-surface px-2.5 py-1 font-mono text-[11px] text-term-muted"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 md:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                What this covers
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-8 space-y-3.5">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-delivered" />
                    <span className="text-sm leading-relaxed sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <aside className="rounded-card border border-line bg-card p-6 shadow-card">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  Engagement notes
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <FileCheck className="mt-0.5 size-4 shrink-0 text-delivered" />
                    Every change documented: records, settings, and why they
                    changed. You keep the playbook.
                  </li>
                  <li className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-delivered" />
                    Before and after verification with the actual tooling, not
                    screenshots of promises.
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 shrink-0 text-delivered" />
                    Async-friendly. Working hours in Asia/Dhaka (GMT+6).
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-delivered px-4 py-2.5 font-semibold text-term transition-colors hover:bg-delivered-bright"
                >
                  Start with an audit
                  <ArrowUpRight className="size-4" />
                </Link>
              </aside>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <h2 className="text-center font-display text-2xl font-semibold tracking-tight">
              How it runs
            </h2>
            <div className="mt-6">
              <ProcessRail />
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <nav
              className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between"
              aria-label="Service navigation"
            >
              <Link
                href={`/services/${prev.id}`}
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest">
                    Previous
                  </span>
                  {prev.title}
                </span>
              </Link>
              <Link
                href={`/services/${next.id}`}
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink sm:text-right"
              >
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest">
                    Next
                  </span>
                  {next.title}
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </nav>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper-subtle">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <Reveal>
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-term p-8 text-center text-term-ink shadow-term sm:flex-row sm:text-left">
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Sound like your problem?
                </h2>
                <p className="mt-1 text-sm text-term-muted">
                  Send the symptoms. You get a diagnosis, not a sales pitch.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-delivered px-4 py-2.5 font-semibold text-term transition-colors hover:bg-delivered-bright"
                >
                  Get in touch
                </Link>
                <a
                  href={links.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-term-line px-4 py-2.5 font-medium transition-colors hover:border-term-muted"
                >
                  Hire on Upwork
                  <ArrowUpRight className="size-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
