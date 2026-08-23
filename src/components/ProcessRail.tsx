const steps = [
  {
    step: "01",
    title: "Audit",
    text: "DNS, authentication, reputation, and content review with a written findings summary.",
  },
  {
    step: "02",
    title: "Fix & authenticate",
    text: "SPF, DKIM, and DMARC alignment plus infrastructure changes, all documented.",
  },
  {
    step: "03",
    title: "Warm & monitor",
    text: "Warmup ramps, postmaster monitoring, and inbox placement checks.",
  },
  {
    step: "04",
    title: "Scale",
    text: "Volume ramps and rotation only after the foundation holds.",
  },
];

export function ProcessRail() {
  return (
    <ol className="grid gap-4 md:grid-cols-4">
      {steps.map((item) => (
        <li
          key={item.step}
          className="rounded-card border border-line bg-card p-5 shadow-card"
        >
          <p className="font-mono text-xs font-semibold text-delivered-ink">
            {item.step}
          </p>
          <h3 className="mt-2 font-display text-base font-semibold tracking-tight">
            {item.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
