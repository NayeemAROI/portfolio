import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-term text-term-ink">
      <div className="term-halo absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid min-h-[70vh] w-full max-w-6xl place-items-center px-4 py-24 text-center sm:px-6">
        <div>
          <p className="animate-rise font-mono text-xs tracking-[0.22em] text-spam">
            550 5.7.1 — PAGE NOT FOUND
          </p>
          <h1
            className="animate-rise mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            This URL bounced.
          </h1>
          <p
            className="animate-rise mx-auto mt-4 max-w-md text-term-muted"
            style={{ animationDelay: "160ms" }}
          >
            The page you are looking for does not exist. Your cold emails do
            not have to end up like this.
          </p>
          <div
            className="animate-rise mt-8 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
            <Link
              href="/"
              className="rounded-xl bg-delivered px-5 py-3 font-semibold text-term transition-colors hover:bg-delivered-bright"
            >
              Back to the inbox
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-term-line px-5 py-3 font-medium transition-colors hover:border-term-muted"
            >
              Report the bounce
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
