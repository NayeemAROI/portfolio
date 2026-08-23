import {
  CHAIN,
  CONTACT,
  JOBS,
  LOCATION,
  NAME,
  OFFER,
  PROBLEM,
  PROBLEM_CITE,
  RECORD,
  SENDING_DOMAIN,
  STACK,
  SUBJECT,
  TITLE,
  VERDICTS,
} from './content';

const MAILTO = `mailto:${CONTACT}?subject=Deliverability%20audit%20request`;

/* The fold's header lines resolve top to bottom. One stagger step = 90ms. */
function delay(step: number) {
  return { animationDelay: `${step * 90}ms` };
}

export default function Page() {
  return (
    <>
      <section className="fold">
        <div className="wrap hdr">
          <span className="hdr-field line" style={delay(0)}>
            Authentication-Results: mx.google.com;
          </span>

          <div className="verdicts">
            {VERDICTS.map((v, i) => (
              <div className="verdict line" key={v.key} style={delay(i + 1)}>
                <h1 className="verdict-main">
                  {v.key}
                  <span className="eq">=</span>
                  <span className="stamp" style={delay(i + 2)}>
                    pass
                  </span>
                </h1>
                <span className="verdict-meta">{v.meta}</span>
              </div>
            ))}
          </div>

          <span className="hdr-field line" style={delay(5)}>
            From: <b>{NAME}</b> &lt;{CONTACT}&gt;
          </span>
          <span className="hdr-field line" style={delay(5)}>
            X-Role: {TITLE} · {LOCATION}
          </span>

          <p className="subject line" style={delay(6)}>
            {SUBJECT}
          </p>

          <div className="replyto line" style={delay(7)}>
            <span className="hdr-field">Reply-To:</span>
            <a className="replyto-link" href={MAILTO}>
              {CONTACT}
            </a>
          </div>
        </div>
      </section>

      <nav className="strip" aria-label="Sections">
        <div className="wrap">
          <ul>
            <li>
              <a href="#failure">The failure</a>
            </li>
            <li>
              <a href="#chain">The chain</a>
            </li>
            <li>
              <a href="#stack">Stack</a>
            </li>
            <li>
              <a href="#engagements">Engagements</a>
            </li>
            <li>
              <a href="#verified">Verified</a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        <section className="sec" id="failure">
          <div className="wrap">
            <h2>Delivered is not inboxed.</h2>
            <div className="prose">
              {PROBLEM.map((p, i) => (
                <p key={i} className={i > 0 ? 'prose-quiet' : undefined}>
                  {p}
                </p>
              ))}
              <span className="cite">{PROBLEM_CITE}</span>
            </div>
          </div>
        </section>

        <section className="sec sec-dense" id="chain">
          <div className="wrap">
            <h2>The chain a mailbox provider reads before your copy.</h2>
            <p className="prose prose-quiet">
              Seven checks, evaluated in this order. A generic &ldquo;authentication: pass&rdquo;
              label hides all of them, which is how a sender spends a week fixing the wrong thing.
            </p>
            <div className="records">
              {CHAIN.map((c) => (
                <div className="rec" key={c.key}>
                  <span className="rec-key">{c.key}</span>
                  <div className="rec-stack">
                    <p className="rec-body">{c.body}</p>
                    <p className="rec-fail">{c.fail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="stack">
          <div className="wrap">
            <h2>Where the work happens.</h2>
            <div className="records">
              {STACK.map((s) => (
                <div className="rec" key={s.key}>
                  <span className="rec-key">{s.key}</span>
                  <p className="rec-body prose-quiet">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec sec-dense" id="engagements">
          <div className="wrap">
            <h2>Seven completed engagements. Every one rated 5.00.</h2>
            <p className="prose prose-quiet">
              Small record, honestly stated: 8 jobs, 7 closed, 3 in progress, 12 tracked hours.
              Every client who left a tag left &ldquo;Committed to Quality&rdquo;.
            </p>
            <div className="records">
              {JOBS.map((j) => (
                <div className="rec" key={j.title}>
                  <span className="rec-meta">{j.when}</span>
                  <div className="rec-stack">
                    <div className="job-head">
                      <p className="job-title">{j.title}</p>
                      <span className="rating">{j.rating}</span>
                    </div>
                    <blockquote className="quote">&ldquo;{j.quote}&rdquo;</blockquote>
                    <ul className="tags">
                      {j.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="verified">
          <div className="wrap">
            <h2>The record, unembellished.</h2>
            <div className="verified">
              <div>
                <span className="vkey">Platform</span>
                <ul className="vlist">
                  {RECORD.platform.map((r) => (
                    <li key={r.k}>
                      <b className="mono">{r.k}</b>
                      <span className="prose-quiet">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="vkey">Certifications</span>
                <ul className="vlist">
                  {RECORD.certifications.map((r) => (
                    <li key={r.k}>
                      <b>{r.k}</b>
                      <span className="prose-quiet">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="vkey">Employment</span>
                <ul className="vlist">
                  {RECORD.employment.map((r) => (
                    <li key={r.k}>
                      <b>{r.k}</b>
                      <span className="prose-quiet">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="vkey">Languages</span>
                <ul className="vlist">
                  {RECORD.languages.map((r) => (
                    <li key={r.k}>
                      <b>{r.k}</b>
                      <span className="prose-quiet">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="close">
          <div className="wrap">
            <span className="close-line">
              Reply-To: {NAME} &lt;{CONTACT}&gt;
            </span>
            <p className="close-offer">{OFFER}</p>
            <a className="replyto-link" href={MAILTO}>
              Request a deliverability audit
            </a>
            <p className="close-line" style={{ marginTop: 'var(--s5)' }}>
              Header values above are a demonstration of the artefact this page is built from, using
              the domain {SENDING_DOMAIN}. They are not a claim about a client&rsquo;s current
              configuration.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
