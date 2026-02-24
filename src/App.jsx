const kpis = [
  { value: "250+", label: "Meetings booked", detail: "Qualified calls generated" },
  { value: "+32%", label: "Average reply lift", detail: "After messaging rebuild" },
  { value: "3.1x", label: "Faster first opportunity", detail: "With GTM automation" },
  { value: "$4.6M", label: "Pipeline influenced", detail: "Across B2B clients" }
];

const services = [
  {
    title: "Pipeline Strategy & ICP Design",
    body: "Define segments, buyer signals, and high-converting offers for your niche."
  },
  {
    title: "Outbound Campaign Architecture",
    body: "Deploy email + LinkedIn systems with messaging that drives qualified replies."
  },
  {
    title: "Data, Enrichment & CRM Routing",
    body: "Build clean lead operations so high-intent conversations never get lost."
  },
  {
    title: "Optimization & Scale",
    body: "Run weekly tests on targeting, copy, and conversion to compound results."
  }
];

const process = [
  "Audit your funnel, messaging, deliverability, and sales handoffs.",
  "Build ICP matrix, value hooks, and sequence architecture.",
  "Launch campaigns with QA, tracking, and clear ownership.",
  "Optimize continuously to improve SQL quality and pipeline output."
];

const cases = [
  "Reply rate improved from 2.4% to 7.9% in 8 weeks.",
  "Entered a new vertical and booked first qualified meetings in 12 days.",
  "Reduced lead response time from 9 hours to 22 minutes with automation."
];

export function App() {
  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#top">
            Apex Pipeline
          </a>
          <nav className="desktop-nav">
            <a href="#results">Results</a>
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#case-studies">Case Studies</a>
          </nav>
          <a className="btn btn-primary nav-cta" href="#contact">
            Book Call
          </a>
        </div>
      </header>

      <main id="top">
        <section className="section hero">
          <div className="container">
            <p className="eyebrow">B2B Lead Generation Specialist</p>
            <h1>Build a Predictable Pipeline of Qualified B2B Meetings</h1>
            <p className="lead">
              I help B2B teams generate consistent SQLs through outbound strategy,
              messaging systems, and automation—so sales talks to the right buyers every week.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#contact">
                Book a Strategy Call
              </a>
              <a className="btn btn-secondary" href="#contact">
                Get a Free Pipeline Audit
              </a>
            </div>
            <p className="trust">Trusted by B2B SaaS, services, and agency growth teams.</p>
          </div>
        </section>

        <section id="results" className="section">
          <div className="container">
            <h2>Results You Can Measure</h2>
            <div className="kpi-row">
              {kpis.map((item) => (
                <article className="card kpi-card" key={item.label}>
                  <h3>{item.value}</h3>
                  <p>{item.label}</p>
                  <small>{item.detail}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2>What I Build</h2>
            <div className="grid two-up">
              {services.map((service) => (
                <article className="card" key={service.title}>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="section">
          <div className="container">
            <h2>A System, Not Guesswork</h2>
            <ol className="timeline">
              {process.map((step, index) => (
                <li key={step}>
                  <strong>Step {index + 1}:</strong> {step}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="case-studies" className="section">
          <div className="container">
            <h2>Selected Growth Outcomes</h2>
            <div className="grid three-up">
              {cases.map((outcome, index) => (
                <article className="card" key={outcome}>
                  <h3>Case Study 0{index + 1}</h3>
                  <p>{outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section section-cta">
          <div className="container cta-block card">
            <h2>Ready to Turn Outreach Into a Predictable Revenue Channel?</h2>
            <p>Book a 30-minute strategy call and leave with a clear 90-day roadmap.</p>
            <a className="btn btn-primary" href="mailto:hello@apexpipeline.com">
              Book Strategy Call
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <p>© 2026 Apex Pipeline. Built for modern B2B growth.</p>
        </div>
      </footer>
    </>
  );
}
