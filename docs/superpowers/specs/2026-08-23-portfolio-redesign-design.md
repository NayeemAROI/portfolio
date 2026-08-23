# Portfolio Redesign: AUTH PASS

**Date:** 2026-08-23
**Status:** awaiting approval
**Direction:** A / AUTH PASS (delegated pick, chosen by agent on the user's instruction "decide for me")
**Repo:** NayeemAROI/portfilio
**Stack:** Next.js 15 App Router, static export, one route

---

## 0. Why this direction was chosen

The user delegated the choice. Evidence used, in order of weight:

1. **Product truth.** The Upwork profile sells *Email Deliverability Expert (Instantly, Apollo, Clay, Google Workspace, M365)*, with SPF, DKIM, DMARC, DNS, and inbox-placement work named explicitly in the skills list. The `Authentication-Results` header is the one artifact that *is* that mechanism rather than a picture of it. The live site sells "B2B Lead Generation Specialist," a claim anyone can make.
2. **Truth constraint.** Real earnings are $400 across 12 tracked hours and 7 completed jobs. There are no volume metrics to publish. AUTH PASS has no slot that wants aggregate numbers: it sells verdicts and mechanism. Direction B (Placement Board) implies publishable per-client placement data that may not exist. Direction C (Transmission Log) needs the most authored assets, the worst pairing with thin proof.
3. **Mode.** Persuade. AUTH PASS puts the offer and the action in the fold as native parts of the form (`Subject:` carries the offer, `Reply-To:` is the primary action), so conversion lives inside the form's own vocabulary instead of being bolted on.
4. **Calibration self-check.** Cold white ground, signal amber, magenta, Martian Mono is none of the three saturated AI-default looks (not cream + serif, not near-black + neon, not broadsheet editorial). Light was picked from the use scene, not category habit: see 2.2.

**Honest risk:** mono-dense technical pages are a recognizable genre, and the density could read as unwelcoming to a non-technical founder. Mitigated by an oversized, plain-language verdict block in the fold and all prose set in Inter Tight at a 65-75ch measure.

### Raises taken from declined challengers

- **From Lightstep (Upperquad):** state change as identity. The auth verdict is not decoration on the brand, it *is* the brand element. Declined as a world (an approachable evolving mark says nothing to someone whose domain is burning).
- **From SingleStore (Standard Projects):** restraint discipline. One register throughout, no second decorative system anywhere. Declined as a world (enterprise gravity would read as a lie against 7 jobs).
- **From Speakeasy (basement.studio):** modular precision in type and spacing rigor. Declined as a world (the predictable minimalist opposite of the category default is still the rut).
- **Competitive alternate, still adoptable:** Sindri (owwco) for keeping logs, keys, and code-adjacent surfaces legible beside marketing-grade material. Its dark-token world is the rut; its legibility discipline is kept.

---

## 1. Claims audit (binding)

Nothing in this table is negotiable at build time. Invented commercial claims do not ship.

### Keep (sourced from the profile)

- 100% Job Success
- 7 completed jobs, 8 total jobs, 3 in progress
- 5.00 average rating across all completed jobs
- Client tags: Committed to Quality x7, Clear Communication x3, Great Attitude x2, Accountable for Outcomes, Professionalism
- Verbatim client quotes from the feedback section
- LinkedIn Marketing Strategy (issued Sept 2024), LinkedIn Marketing Solutions Fundamentals (issued Jan 2024), both verified
- Employment: LinkedIn B2B Lead Generation Specialist at DNA Protected (Jul 2025 to present); Key Account Manager, Digital Marketing Executive and Lead Gen Expert at Aggressive ROI (Feb 2021 to present); Web Developer at SoftTech-iT Institute (Jan 2017 to Jun 2020)
- Languages: English (fluent), Bengali (native or bilingual)
- 3 existing portfolio pieces
- Stack named on the profile: Instantly, Apollo, Clay, Google Workspace, Microsoft 365, Smartlead, Lemlist, plus SPF/DKIM/DMARC/DNS work

### Cut (unsupportable, currently live on the site)

- 250+ meetings booked
- +32% average reply lift
- 3.1x faster first opportunity
- $4.6M pipeline influenced
- Reply rate 2.4% to 7.9% in 8 weeks
- First qualified meetings in 12 days
- Lead response time 9 hours to 22 minutes
- "Trusted by B2B SaaS, services, and agency growth teams"
- `hello@apexpipeline.com` (invented address)

### Third-party data, attribution required

One industry statistic may be used in section 3.2 to frame the problem, attributed inline and clearly not the user's own result: roughly 60% of tested email reaches a visible mailbox while about 36% lands in spam, so SMTP acceptance overstates real inbox reach. Source must be named in the markup. If attribution is not wanted, the section states the mechanism without any number.

### Placeholders requiring user replacement

| Slot | Placeholder | Action |
|---|---|---|
| Contact address | `nayeemur.aroi@gmail.com` (the user's real address, not invented) | Confirm or replace with a professional domain address |
| Brand name | Dropped. The page is Nayeemur Rahman. | Confirm "Apex Pipeline" is retired |
| Repo name | `portfilio` | Rename to `portfolio`; it is a typo in a public URL |
| Portfolio thumbnails | 3 existing pieces, re-shot at 2x | Supply clean captures |

---

## 2. The committed world

### 2.1 Color strategy: Full palette, four named roles

| Role | Value | Use |
|---|---|---|
| Ground | `#F4F5F7` | Page surface. Cold, slightly blue-shifted white. |
| Ink | `#000000` | All display and body type. |
| Pass | `#FFB000` | Signal amber. Fill and stamp only. |
| Fail | `#FF2E63` | Magenta. Display size or fill only. |
| Secondary ink | `#4A4F57` | Cool slate, tinted from the ground's hue. Metadata, timestamps. |
| Fail (body size) | `#C4183C` | Darkened magenta for any fail label at body size. |

**Computed contrast, not eyeballed:**

- Ink on Ground: ~20:1. Pass.
- Secondary ink on Ground: 7.5:1. Pass for body.
- Fail `#FF2E63` on Ground: **3.3:1. Large text only.** Fails body text. Any fail label under 24px uses `#C4183C` at 5.4:1.
- Pass `#FFB000` on Ground: **1.9:1. Never text.** Amber is a fill; text sitting on amber is Ink at ~11:1.

These two rules are the ones most likely to be silently broken during the build. Amber is never type on the ground. Magenta is never body type on the ground.

### 2.2 Light, chosen from the use scene

A founder or growth lead opens this at a desk, mid-morning, on a laptop, immediately after being told their cold email is landing in spam. They are reading a diagnostic. Diagnostics are read on paper-white, not in a dark IDE. Light ground, and the darkness in the page comes from ink density rather than a dark surface.

### 2.3 Type

- **Martian Mono** for verdict blocks, header fields, the fold headline, timestamps, and record rows. Mono is earned here on the craft floor's own terms: this is literal measurement and machine output, not a costume for "technical."
- **Inter Tight** for prose, section bodies, and client quotes.
- Both loaded through `next/font/google`, which self-hosts at build time. No runtime request to Google.
- Display ceiling 6rem. Tracking floor -0.04em; the fold verdict sits at -0.03em.
- Prose measure 65-75ch. `tabular-nums` on every date, timestamp, and record number.
- Scale steps must be obvious: no two adjacent roles within 15% of each other.

### 2.4 Refused, explicitly

The current site trips four of these. None return.

- No eyebrow or kicker above any heading. The `.eyebrow` class is deleted, not restyled.
- No hero-metric row. There are no metrics, and the template is refused regardless.
- No grid of same-size icon-heading-text cards as page structure. Structure is header blocks and record rows.
- No radial accent glow behind the fold (currently in `body`).
- No gradient text, no glassmorphism, no colored side-stripe borders, no hard offset shadows, no emoji standing in for icons, no section numbers.
- Elevation declared once: hairline rules, not border-plus-shadow. There are no cards, so no ghost cards.

### 2.5 Browser surfaces (themed from the palette, not left default)

- `::selection`: amber fill, ink text.
- Caret: amber.
- Focus ring: 2px solid ink, 2px offset. Visible on every interactive element.
- Scrollbar: thin, slate thumb on ground.
- Link underline: `text-underline-offset: 0.2em`, `text-decoration-thickness: 1px`.

---

## 3. Page structure, one route

Seven regions. Density varies deliberately: dense fold, quiet problem statement, dense chain, quiet stack, dense records, quiet proof, dense close.

### 3.1 Fold: the header block

A real `Authentication-Results` header filling the viewport. Not a hero with a header graphic in it: the header **is** the fold.

```
Authentication-Results: mx.google.com;
       spf=pass    smtp.mailfrom=nayeemurrahman.com
       dkim=pass   header.i=@nayeemurrahman.com
       dmarc=pass  p=reject sp=reject
From:     Nayeemur Rahman <...>
Subject:  Your cold email is being delivered. It is not being read.
Reply-To: [primary action]
```

- `spf=pass dkim=pass dmarc=pass` is the largest type on the page. The three `pass` verdicts stamp in amber.
- `Subject:` carries the offer in one line.
- `Reply-To:` is the primary action, built as a real link in the header's own vocabulary. Not a rounded button dropped into a mono block.
- No navigation bar in the fold. A thin persistent field-jump strip appears after the fold.
- **Memory test:** someone who leaves after one viewport describes "a page that was an email header, and the header passed." That is a form, not a mood.

### 3.2 The failure it fixes (quiet)

What `250 OK` hides. Delivered is not inboxed. Prose at 65-75ch, Inter Tight, no illustration. Optional attributed industry statistic per section 1.

### 3.3 The chain (dense)

The real diagnostic chain as the page's structural spine, each link a record row with its own verdict:

1. SPF authorization
2. SPF alignment
3. DKIM selector DNS
4. DKIM alignment
5. DMARC policy quality
6. Reverse DNS and HELO
7. MTA-STS and TLS-RPT

This is the section that separates the user from every "lead gen specialist" on the platform: it shows the work, at the resolution a technical buyer recognizes. Each row names the failure mode in plain language, so the non-technical reader gets it too.

### 3.4 Stack (quiet)

Instantly, Apollo, Clay, Google Workspace, Microsoft 365, Smartlead, Lemlist as record rows in one column with role annotations. Not a logo wall, not icon tiles. Any icons are drawn SVG at one stroke weight, or omitted.

### 3.5 Engagements (dense)

The 7 completed jobs as message records. Each carries the real job title, real date range, the verbatim client quote, and the real client tags. No invented metric anywhere. Records with thin feedback stay thin; padding them is how invention starts.

### 3.6 Verified (quiet)

100% Job Success, 5.00 average, the two dated LinkedIn certifications, employment history, languages. Presented as a verification block, matching the fold's grammar.

### 3.7 Close (dense)

A second `Reply-To:` block with the real address, restating the offer in one line. A real close, anchored, not a thin footer.

---

## 4. Motion: one authored moment

The header fields resolve top to bottom on load, ~90ms stagger, and the three verdicts stamp in amber as each lands. `cubic-bezier(0.16, 1, 0.3, 1)`. Content is fully visible in the default state, so a failed script cannot hide the page.

Nothing else on the page animates. No section fades, no scroll reveals, no hover lifts.

`prefers-reduced-motion: reduce`: fields present immediately with no stagger. The amber verdict color still applies, because it carries state and state must survive. Reduced motion means fewer and gentler, not stripped of meaning.

---

## 5. Technical boundaries

**Next.js is pinned by the user.** Raised once already that a single static page does not need it; honored without further argument, and kept minimal:

- Next.js 15, App Router, **one route** at `app/page.tsx`. No route groups, no dynamic routes, no API routes.
- `output: 'export'` in `next.config.mjs`. Static HTML, deployable to GitHub Pages or Vercel.
- `next/font/google` for Martian Mono and Inter Tight. Self-hosted at build.
- **No CSS framework.** One global stylesheet with custom properties for the six palette roles and one spacing scale on a 4-unit base. Tailwind is a dependency for a single page; native CSS covers this.
- No component library, no animation library. The one motion moment is CSS keyframes.
- No analytics, no cookie banner, no chat widget unless the user asks.

**Files touched:** `index.html` and `styles.css` are deleted, replaced by the Next.js app. `.agent`, `.claude`, and `tasks` are left alone.

### Direction contract

Before any component is written, this comment goes in `app/layout.tsx` as the first child of `<body>`, emitted as a real HTML comment in the built markup (not JSX-only, not frontmatter):

```
THESIS: This page is a mail header that passes. It refuses the
  consultant hero + KPI row + card grid the category ships.
OWN-WORLD: Cold white #F4F5F7, ink black, signal amber #FFB000 as
  fill-only pass state, magenta #FF2E63 as fail. Martian Mono for
  machine output, Inter Tight for prose. Hairline rules, no cards.
STORY: Visitor learns delivered is not inboxed, sees the auth chain
  diagnosed at technical resolution, and replies.
FIRST VIEWPORT: Authentication-Results header at full height. Three
  pass verdicts are the largest type on the page. Subject line carries
  the offer. Reply-To is the primary action. No nav bar.
FORM: Mail header, position 1 of 7 derived candidates.
FINISH: unreviewed and undocumented is unfinished; this build ends
  with the finish review, the verdict, and the recorded world.
```

---

## 6. Failure handling

- **Font fallback:** metric-compatible local fallbacks declared so the layout does not reflow. `font-display: swap`.
- **No JavaScript:** the full page renders and every link works. The stagger is the only loss.
- **Long content:** real client quotes vary in length. Record rows must hold a 3-word quote and a 400-character quote without breaking. Test both.
- **Narrow viewports:** the header block is the risk. A mono header at 320px cannot hold desktop line breaks, so the fold reflows to a stacked field list below 640px with the verdict block still dominant. `overflow-x` must be zero at 320px.
- **Zoom:** usable at 200%.
- **Missing assets:** if portfolio thumbnails are not supplied, that region ships omitted rather than filled with generic chrome.

---

## 7. Verification

One runnable check, per the minimal-diff rule. No test framework for a static page.

```bash
npm run build && grep -q "THESIS:" out/index.html
```

This proves two things at once: the static export succeeds, and the direction contract survived the production build. A contract the build erased is a contract nobody can audit.

**Manual verification list (the agent cannot run these; the user must):**

1. 320px, 768px, 1440px: no horizontal overflow, fold verdict still dominant.
2. Tab through the page: focus ring visible on every interactive element.
3. Toggle reduced motion: fields appear instantly, amber verdicts still colored.
4. Real copy at every breakpoint: nothing overflows, no orphaned header field.
5. Screenshot the fold and paste it back for the finish review.

**Contrast is computed in section 2.1 rather than checked in a browser.** Anything requiring a render (motion smoothness, font fallback swap, actual line breaks) is unverified until the user supplies a screenshot, and will be labeled unverified in the finish review rather than assumed green.

---

## 8. Out of scope

- Case study detail routes, an about page, a blog. Single route only; revisit when there is content to justify them.
- CMS or MDX content layer. Content is small and stable; it lives in the component.
- Dark mode. The light ground is a decision from the use scene, not a default to be inverted.
- Any redesign of `autoreach-landing-page` or `salesnav-exporter`.

---

## 9. Open decisions for the user

1. Confirm or replace the contact address (`nayeemur.aroi@gmail.com` is the placeholder, taken from real data).
2. Confirm "Apex Pipeline" is retired in favor of the user's own name.
3. Approve or decline the repo rename `portfilio` to `portfolio`.
4. Approve or decline the attributed third-party statistic in 3.2.

---

## 10. Estimates

| Phase | Time |
|---|---|
| Scaffold Next.js, fonts, palette, direction contract | 45 min |
| Fold: header block + stamp motion, desktop and mobile | 2 hours |
| Sections 3.2 to 3.7 | 3 hours |
| Responsive and reduced-motion passes | 1 hour |
| Finish review, one fix batch, recorded world | 1.5 hours |
| **Total** | **about one full day** |

The fold gets proven against the contract before any later section is built. Every following section inherits the fold's shortfall, so a retry there is cheap and a rebuild verdict at the end is not.

---

**Next step:** user reviews this spec. No code is written until it is approved. On approval, load Writing Implementation Plans.
