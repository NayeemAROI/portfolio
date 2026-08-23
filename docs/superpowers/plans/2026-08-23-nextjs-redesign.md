# Next.js Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design authority:** /PRODUCT.md and /DESIGN.md (Impeccable). At session start run `node .claude/skills/impeccable/scripts/context.mjs` (Antigravity: `.agent/skills/impeccable/scripts/context.mjs`); it loads both docs automatically. Load `reference/craft-floor.md` immediately before writing any UI. Finish the project with `/impeccable audit` then `/impeccable polish`.

**Goal:** Replace the placeholder static site with a truthful, modern Next.js portfolio for Nayeemur Rahman that converts visitors into booked calls.

**Architecture:** Next.js 15 App Router + TypeScript strict + Tailwind CSS v4 CSS-first tokens. All copy, stats, and quotes live in typed data modules under `src/data/`; components render truth and never contain it. Every page statically generated; one server action (contact form). Deployed on Vercel from `main`.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind v4, `motion` (Framer Motion), next/font (Bricolage Grotesque, Inter, JetBrains Mono), Vitest + Testing Library, Playwright + @axe-core/playwright, GitHub Actions, Vercel, optional Resend for the form.

---

## Working agreements (Ponytail mode + ADHD mode)

- **One phase = one sitting (25-45 min).** Stop at the phase boundary even if energy is high. Leave a one-line "NEXT:" note in the commit body.
- **Every phase ends deployed and committed.** Visible progress is the reward loop.
- **One checkbox at a time.** If a step balloons past ~10 minutes, split it, commit what works, take the win.
- **No rabbit holes:** no font shopping, no palette second-guessing. DESIGN.md already decided. Deviations require editing DESIGN.md first in a separate commit.
- **Never edit `.claude/` or `.agent/`** (installed skills). Leave `tasks/` untouched.
- Sub-skill map: plan execution = superpowers:executing-plans; per-task agents = superpowers:subagent-driven-development; before any "done" claim = superpowers:verification-before-completion; merge ritual = superpowers:finishing-a-development-branch.

---

## Phase 0 - Truth rescue (20 min)

### Task 0.1: Branch and archive the placeholder
- [ ] `git checkout -b redesign/nextjs`
- [ ] `mkdir legacy && git mv index.html styles.css legacy/`
- [ ] Commit: `chore: archive placeholder site to legacy/`

### Task 0.2: Verify content truth (fill before Phase 6)
- [ ] Open the live Upwork profile and confirm each number in `src/data/proof.ts` (health %, open rates, replies, JSS, response time).
- [ ] Collect exact URLs: Upwork profile, LinkedIn profile. Paste into `src/data/links.ts`.
- [ ] Decide the public contact route (recommended: form only, no raw email).

---

## Phase 1 - Scaffold, tokens, first deploy (45 min)

### Task 1.1: Manual Next.js scaffold (repo is not empty, create-next-app would refuse)
**Files to create:**

`package.json`
```json
{
  "name": "nayeem-portfolio",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test"
  },
  "dependencies": {
    "motion": "^12.23.0",
    "next": "^15.4.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.0",
    "@playwright/test": "^1.54.0",
    "@tailwindcss/postcss": "^4.1.0",
    "@testing-library/react": "^16.2.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.4.0",
    "jsdom": "^26.0.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  }
}
```

`postcss.config.mjs`
```js
export default { plugins: { "@tailwindcss/postcss": {} } }
```

`tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "legacy"]
}
```

`next.config.ts`
```ts
import type { NextConfig } from "next"
const nextConfig: NextConfig = { reactStrictMode: true }
export default nextConfig
```

Append to `.gitignore` (create it, repo has none): `node_modules/`, `.next/`, `out/`, `coverage/`, `test-results/`, `playwright-report/`, `.env*.local`, `next-env.d.ts`, `*.tsbuildinfo`.

- [ ] Create the five files above
- [ ] `npm install` (expect a lockfile and zero vulnerabilities of level high)

### Task 1.2: Tokens and fonts (DESIGN.md made these decisions)

`src/app/globals.css`
```css
@import "tailwindcss";

@theme {
  --color-paper: #fafaf7;
  --color-ink: #101418;
  --color-muted: #5b6470;
  --color-line: #e3e1da;
  --color-card: #ffffff;
  --color-term: #0b0e11;
  --color-term-ink: #e8edf2;
  --color-term-line: #1f252b;
  --color-delivered: #1fa55a;
  --color-delivered-ink: #187f46;
  --color-delivered-bright: #34d07c;
  --color-warm: #e8a13c;
  --color-spam: #e0533d;
  --font-display: var(--font-bricolage);
  --font-sans: var(--font-inter);
  --font-mono: var(--font-jetbrains);
  --radius-card: 12px;
}

body {
  background: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sans);
  line-height: 1.65;
}

::selection { background: color-mix(in srgb, var(--color-delivered) 25%, transparent); }

:focus-visible { outline: 2px solid var(--color-delivered); outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

`src/lib/fonts.ts`
```ts
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google"

export const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" })
export const sans = Inter({ subsets: ["latin"], variable: "--font-inter" })
export const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })
```

`src/app/layout.tsx`
```tsx
import type { Metadata } from "next"
import { display, sans, mono } from "@/lib/fonts"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://nayeemaroi.vercel.app"),
  title: { default: "Nayeemur Rahman - Cold email that lands", template: "%s - Nayeemur Rahman" },
  description:
    "Email deliverability engineer. Cold outreach systems, SPF/DKIM/DMARC, Google Workspace, Microsoft 365, and WordPress support. 100% Job Success on Upwork.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

`src/app/page.tsx` (placeholder, replaced in Phase 4)
```tsx
export default function Home() {
  return (
    <main className="grid min-h-svh place-items-center">
      <h1 className="font-display text-5xl">It lands.</h1>
    </main>
  )
}
```

- [ ] Create the four files
- [ ] `npm run dev`, open http://localhost:3000. Expected: paper background, "It lands." in Bricolage Grotesque
- [ ] Commit: `feat: scaffold Next.js 15 with Delivered token system`

### Task 1.3: Deploy day one
- [ ] Push branch, import repo in Vercel (framework: Next.js, root: /)
- [ ] Expected: live preview URL renders the placeholder
- [ ] Commit nothing; record the URL in the PR description

---

## Phase 2 - Data layer: truth as code (45 min)

All content comes from the Upwork profile. VERIFY tags mark items to confirm in Task 0.2.

### Task 2.1: Types and site constants

`src/data/site.ts`
```ts
export const site = {
  name: "Nayeemur Rahman",
  handle: "NayeemAROI",
  role: "Email Deliverability Expert",
  tagline: "Cold email that lands. Systems that scale.",
  subline:
    "I run email systems end to end: setup, migration, DNS, deliverability, and cold outreach that reaches the inbox instead of spam.",
  location: "Gazipur, Bangladesh",
  timezone: "Asia/Dhaka (GMT+6)",
  availability: "Open to offers - responds in 0-4 hours", // VERIFY
}
```

`src/data/links.ts`
```ts
export const links = {
  github: "https://github.com/NayeemAROI",
  upwork: "", // VERIFY: paste exact profile URL (Task 0.2)
  linkedin: "", // VERIFY: paste exact profile URL (Task 0.2)
}
```

### Task 2.2: Services (7, from the Upwork profile)

`src/data/services.ts`
```ts
export type Service = {
  slug: string
  title: string
  promise: string
  bullets: string[]
  tools: string[]
}

export const services: Service[] = [
  {
    slug: "cold-email-systems",
    title: "Cold Email & Outreach Systems",
    promise: "Campaigns that get replies, not spam complaints.",
    bullets: [
      "Lead sourcing and list building: Apollo, Clay, LinkedIn Sales Navigator, manual research",
      "Campaign setup and management in Instantly, Smartlead, and Apollo",
      "Inbox warmup, rotation, and volume ramps that protect sender reputation",
      "Weekly reporting: sends, opens, replies, bounces, and what to fix next",
    ],
    tools: ["Instantly", "Apollo", "Smartlead", "Clay", "Sales Navigator"],
  },
  {
    slug: "deliverability",
    title: "Email Deliverability & Authentication",
    promise: "SPF, DKIM, and DMARC done right. Inbox, not spam.",
    bullets: [
      "SPF, DKIM, DMARC, MX, TXT, and CNAME setup with correct alignment",
      "Domain and inbox infrastructure for scale: subdomains and tracking domains",
      "Spam placement diagnosis and reputation recovery",
      "Monitoring with Google Postmaster Tools and Microsoft SNDS",
    ],
    tools: ["Postmaster Tools", "SNDS", "Cloudflare", "MXToolbox"],
  },
  {
    slug: "google-workspace",
    title: "Google Workspace",
    promise: "Clean setup, safe migration, sane administration.",
    bullets: [
      "Domain setup, verification, and email routing",
      "Users, groups, aliases, shared drives, and retention policies",
      "Admin console security and access policies",
      "Migrations in and out with zero data loss",
    ],
    tools: ["Google Admin", "Gmail", "Cloudflare"],
  },
  {
    slug: "microsoft-365",
    title: "Microsoft 365",
    promise: "Tenant setup, migration, and admin without downtime.",
    bullets: [
      "Tenant setup and custom domain configuration",
      "Exchange Online, Teams, OneDrive, and SharePoint administration",
      "Licensing, user management, and security defaults",
      "Migration between Microsoft 365 and Google Workspace",
    ],
    tools: ["M365 Admin", "Exchange Online", "PowerShell"],
  },
  {
    slug: "email-migration",
    title: "Email Migration",
    promise: "Zero data loss. Zero missed email.",
    bullets: [
      "Google Workspace to Microsoft 365 and the reverse",
      "IMAP, cPanel, Roundcube, webmail, and Zoho migrations",
      "Cutover planning: MX switch with no delivery gap",
      "Post-migration verification and DNS cleanup",
    ],
    tools: ["IMAP", "cPanel", "Microsoft 365", "Google Workspace"],
  },
  {
    slug: "dns",
    title: "Domain & DNS Management",
    promise: "Records that resolve. Propagation without surprises.",
    bullets: [
      "GoDaddy, Namecheap, Cloudflare, Squarespace, Wix, Bluehost, Shopify",
      "Email authentication records and subdomain strategy",
      "SSL, redirects, and propagation debugging",
      "Registrar and nameserver moves done safely",
    ],
    tools: ["Cloudflare", "GoDaddy", "Namecheap"],
  },
  {
    slug: "website-support",
    title: "Website Support",
    promise: "Fast, secure WordPress that stays up.",
    bullets: [
      "WordPress and WooCommerce builds, fixes, and optimization",
      "Hosting migration, SSL, and Cloudflare setup",
      "SMTP configuration so site email actually delivers",
      "Elementor and theme customization",
    ],
    tools: ["WordPress", "WooCommerce", "Elementor", "Cloudflare"],
  },
]
```

### Task 2.3: Proof, testimonials, timeline

`src/data/proof.ts`
```ts
// VERIFY every value against the live Upwork profile in Task 0.2
export const proof = [
  { label: "JOB_SUCCESS", value: "100%", note: "Upwork" },
  { label: "CLIENT_RATING", value: "5.0", note: "every completed job" },
  { label: "INBOX_HEALTH", value: "87-100%", note: "managed sending inboxes" },
  { label: "OPEN_RATE", value: "45-53%", note: "cold campaigns" },
  { label: "REPLIES", value: "10,000+", note: "Apollo + Instantly" },
  { label: "RESPONSE_TIME", value: "0-4h", note: "average" },
]
```

`src/data/testimonials.ts`
```ts
// Quotes verbatim from Upwork reviews. VERIFY wording in Task 0.2. Do not edit quotes.
export type Testimonial = { quote: string; job: string; rating: number }

export const testimonials: Testimonial[] = [
  { quote: "Email test task done successfully. Good work. Thanks a lot for the help Nayeemur!", job: "Cold email test", rating: 5 },
  { quote: "I liked to work with Nayeemur on this test task. Happy to try a bit bigger task. Thank you for your help, Thomas", job: "Cold outreach specialist - huge audience", rating: 5 },
  { quote: "Nayeemur was thorough and communicates at a high level! Would recommend to others!", job: "Outbound Leads", rating: 5 },
  { quote: "He was extremely knowledgeable and completed all of my requirements successfully. I am very pleased!", job: "WordPress expert (Elementor)", rating: 5 },
  { quote: "Great work, very fast freelancer. Highly recommend!", job: "HTML to WordPress", rating: 5 },
  { quote: "I had a wonderful experience with Nayeem, he is very responsive and was able to deliver quality work. I will hire him again!", job: "WordPress developer", rating: 5 },
  { quote: "I got work very soon. He is honest and dedicated person also.", job: "WordPress installation", rating: 5 },
]
```

`src/data/timeline.ts`
```ts
export const timeline = [
  { period: "2023 - present", role: "LinkedIn B2B Lead Generation Specialist", org: "DNA Protected" },
  { period: "2020 - 2023", role: "Key Account Manager, Digital Marketing & Lead Gen", org: "Aggressive ROI" }, // VERIFY end date
  { period: "2017 - 2022", role: "Web Developer", org: "SoftTech-IT Institute" }, // VERIFY dates
]

export const certifications = [
  { name: "LinkedIn Marketing Strategy", issuer: "LinkedIn", year: "2024" },
  { name: "LinkedIn Marketing Solutions Fundamentals", issuer: "LinkedIn", year: "2024-2026" },
]

export const education = [
  { degree: "B.Sc. Computer Science", school: "Green University of Bangladesh" },
  { degree: "Computer Engineering", school: "Model Institute of Science & Technology" },
]
```

### Task 2.4: Truth guard test (TDD: write it before the pages exist)

`vitest.config.ts`
```ts
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"
import path from "node:path"

export default defineConfig({
  plugins: [react()],
  test: { environment: "jsdom", include: ["src/**/*.test.{ts,tsx}"] },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
})
```

`src/data/truth.test.ts`
```ts
import { describe, expect, it } from "vitest"
import { services } from "./services"
import { testimonials } from "./testimonials"
import { proof } from "./proof"
import { site } from "./site"

const BANNED = [/lorem/i, /apex pipeline/i, /\$4\.6M/i, /250\+ meetings/i, /passionate/i]
const everything = JSON.stringify({ services, testimonials, proof, site })

describe("content truth guard", () => {
  it("never ships placeholder or fabricated legacy content", () => {
    for (const pattern of BANNED) expect(everything).not.toMatch(pattern)
  })
  it("has 7 services with at least 3 bullets each", () => {
    expect(services).toHaveLength(7)
    for (const s of services) expect(s.bullets.length).toBeGreaterThanOrEqual(3)
  })
  it("keeps every testimonial at 5 stars and non-empty", () => {
    expect(testimonials.length).toBeGreaterThanOrEqual(7)
    for (const t of testimonials) {
      expect(t.rating).toBe(5)
      expect(t.quote.length).toBeGreaterThan(10)
    }
  })
})
```

- [ ] Create data files and test config
- [ ] `npm test` - expected: 3 passing
- [ ] Commit: `feat: typed truth-only content layer with guard tests`

---

## Phase 3 - System components (60 min)

Load `reference/craft-floor.md` before this phase. Components live in `src/components/`. Keep each file under ~120 lines.

### Task 3.1: Primitives (full code)

`src/components/StatusBadge.tsx`
```tsx
const tones = {
  delivered: "text-delivered-ink border-delivered/40 bg-delivered/10",
  warm: "text-warm border-warm/40 bg-warm/10",
} as const

export function StatusBadge({ tone = "delivered", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${tones[tone]}`}>
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  )
}
```

`src/components/RecordRow.tsx` (skills as DNS records, DESIGN.md motif 3)
```tsx
export function RecordRow({ type, name, value, ok = true }: { type: string; name: string; value: string; ok?: boolean }) {
  return (
    <div className="grid grid-cols-[64px_1fr_2fr_24px] items-baseline gap-3 border-b border-line py-2.5 font-mono text-sm">
      <span className="text-delivered-ink">{type}</span>
      <span className="text-ink">{name}</span>
      <span className="truncate text-muted">{value}</span>
      <span aria-label={ok ? "verified" : "pending"} className={ok ? "text-delivered" : "text-warm"}>{ok ? "OK" : ".."}</span>
    </div>
  )
}
```

### Task 3.2: Shell (specs; craft-floor owns the pixels)
- `src/components/SiteHeader.tsx`: sticky, paper/90 blur, hairline bottom border. Left: `NR` monogram + name in mono. Right: Services / Work / About links + `Book a call` pill (delivered green). Mobile: same row, links collapse into a details/summary menu. No hamburger animation budget.
- `src/components/SiteFooter.tsx`: mono small print: name, timezone `Asia/Dhaka GMT+6`, links (GitHub, Upwork, LinkedIn), line `Built with Next.js. No fabricated numbers.`
- `src/components/Section.tsx`: container 1120px, mono eyebrow prop rendered as `MX-01 // LABEL`, optional `terminal` variant (term background, full-bleed).
- [ ] Build the three components with craft-floor open
- [ ] `npm run dev` visual check at 375px and 1280px
- [ ] Commit: `feat: shell and primitives in the Delivered system`

---

## Phase 4 - Home page (2 sittings)

Section order (Persuade): Hero inbox -> Postmaster proof strip -> Services grid -> Process -> Real reviews -> Stack records -> Compose CTA.

### Task 4.1: Hero (signature moment, DESIGN.md motif 1)
- `src/components/InboxHero.tsx` (client component, `motion`):
  - H1: `Cold email that lands.` (display font, clamp to 72px). Subline from `site.subline`.
  - Right/below: an inbox card where 4 rows arrive staggered (60ms): `SPF aligned`, `DKIM signed`, `DMARC pass`, `Reply: "Let's talk Tuesday"` - each row slides up 10px + fades, then a green check draws in. Plays once; reduced-motion renders rows static.
  - CTAs: `Book a call` (delivered) + `See the work` (ghost). StatusBadge above H1: `OPEN TO OFFERS`.
- [ ] Build hero; verify reduced-motion in devtools
- [ ] Commit: `feat: inbox hero with delivered animation`

### Task 4.2: Proof strip + services + process
- Postmaster strip (terminal Section): the 6 `proof` entries as mono `LABEL value` pairs on term background.
- Services: 7 cards from `services.ts` (title, promise, tools as mono chips), linking to `/services/[slug]`.
- Process: 4 steps as a numbered mono list: Audit -> Fix records -> Warm & launch -> Monitor & scale.
- [ ] Build the three sections
- [ ] Commit: `feat: proof, services, process sections`

### Task 4.3: Reviews + stack + CTA
- Reviews: masonry-free two-column wall of the 7 real quotes (quote, job label, 5 mono stars). No carousels.
- Stack: RecordRow table: `TOOL instantly.ai "campaign infrastructure" OK` style for the main tools.
- Compose CTA (motif 4): compose-window card `To: Nayeemur Rahman`, `Subject: [your project]`, textarea-look body, Send button -> /contact.
- [ ] Build sections; delete `page.tsx` placeholder; assemble home
- [ ] `npm run build` passes; deploy preview looks right on mobile
- [ ] Commit: `feat: complete home page`

---

## Phase 5 - Inner pages + contact (2 sittings)

### Task 5.1: Services detail
- `src/app/services/[slug]/page.tsx` + `generateStaticParams` from `services.ts`; layout: promise H1, bullets as checked list, tools as records, CTA. `generateMetadata` per service.
- [ ] Build; `npm run build` shows 7 static pages; commit `feat: service detail pages`

### Task 5.2: Work + About
- `/work`: cards for the 7 completed Upwork jobs (job title, review quote, outcome line) + `autoreach` and `salesnav-exporter` as product cards with GitHub links.
- `/about`: short story (email systems since 2017), `timeline`, `certifications`, `education`, languages, location card with local-time widget (Asia/Dhaka).
- [ ] Build both; commit `feat: work and about pages`

### Task 5.3: Contact with server action
`src/app/contact/actions.ts`
```ts
"use server"
import { z } from "zod"

const Brief = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(20).max(2000),
})

export type ContactState = { ok: boolean; error?: string }

export async function sendBrief(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = Brief.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { ok: false, error: "Fill name, a real email, and at least 20 characters." }
  if (!process.env.RESEND_API_KEY) return { ok: false, error: "FALLBACK_LINKS" }
  const { Resend } = await import("resend")
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO ?? "",
    replyTo: parsed.data.email,
    subject: `Brief from ${parsed.data.name}`,
    text: parsed.data.message,
  })
  return error ? { ok: false, error: "Send failed. Use the Upwork link below." } : { ok: true }
}
```
(Install `resend` only in this task: `npm i resend`. If `error === "FALLBACK_LINKS"` the form swaps to Upwork/LinkedIn/GitHub buttons, so the page works with zero env vars.)
- [ ] Build `/contact` page with useActionState, honeypot field, and fallback links
- [ ] Commit: `feat: contact form with server action and fallback`

---

## Phase 6 - Ship it (1-2 sittings)

### Task 6.1: SEO + metadata
- `src/app/sitemap.ts` and `src/app/robots.ts` (standard Next helpers, list all static routes).
- `src/app/opengraph-image.tsx`: ImageResponse, term background, mono `DELIVERED` check + name. 
- JSON-LD Person schema in layout (name, jobTitle, sameAs: GitHub/Upwork/LinkedIn).
- [ ] Build; verify `/sitemap.xml`, `/robots.txt`, OG preview

### Task 6.2: Quality gates
`.github/workflows/ci.yml`
```yaml
name: CI
on:
  push: { branches: [main] }
  pull_request:
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

`e2e/a11y.spec.ts`
```ts
import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

for (const path of ["/", "/work", "/about", "/contact", "/services/deliverability"]) {
  test(`a11y: ${path}`, async ({ page }) => {
    await page.goto(path)
    const results = await new AxeBuilder({ page }).analyze()
    expect(results.violations).toEqual([])
  })
}
```
- [ ] Add CI + Playwright config; `npm run e2e` green locally
- [ ] Lighthouse (mobile) on the preview: Performance >= 95, A11y = 100, SEO = 100. Fix what fails once, in one batch (Impeccable bounded-pass rule)

### Task 6.3: Impeccable finish + merge
- [ ] Run `/impeccable audit` on the preview; fix findings in one batch
- [ ] Run `/impeccable polish`; apply in one batch, stop
- [ ] Complete Task 0.2 VERIFY list (real URLs, confirmed numbers); truth test still green
- [ ] `git rm -r legacy/` - the placeholder dies here; commit `chore: remove legacy placeholder`
- [ ] superpowers:verification-before-completion, then superpowers:finishing-a-development-branch: PR `redesign/nextjs` -> `main`, merge, confirm Vercel production deploy
- [ ] Optional: rename repo `portfilio` -> `portfolio` in GitHub settings (old URLs redirect), update Vercel link

---

## Phase 7 (optional, later) - /notes: inbound engine
- MDX via `@next/mdx` under `src/app/notes/`; start with 3 guides: "SPF, DKIM, DMARC in plain English", "Why your cold email lands in spam", "Google Workspace vs Microsoft 365 for cold outreach".
- Each note ends with the Compose CTA. Add RSS via `src/app/feed.xml/route.ts`.

---

## Self-review notes (writing-plans checklist)
- Spec coverage: PRODUCT.md audiences map to home (founders), services detail (agencies), work/about (Upwork validation), contact (all). Modes per PRODUCT.md.
- No placeholders: UI tasks intentionally carry specs, not final code, because Impeccable craft-floor + DESIGN.md own visual execution at build time; all deterministic files (config, data, action, CI, tests) are complete above.
- Type consistency: `Service`, `Testimonial`, `ContactState` defined once and reused. Data imports use the `@/` alias configured in tsconfig.
