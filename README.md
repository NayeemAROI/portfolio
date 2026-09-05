# Nayeemur Rahman · Portfolio

Portfolio site for an email deliverability specialist, built around one idea:
the site itself behaves like a healthy inbox. Everything lands, nothing goes
to spam.

## Stack

- Next.js 15 (App Router, `output: "export"`, GitHub Pages compatible)
- React 19, TypeScript strict
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Self-hosted fonts via `@fontsource-variable/*` (no Google Fonts at build or runtime)
- lucide-react icons, Vitest for the data truth guard
- CSS-only motion, no tracking scripts, no animation libraries

## Commands

```bash
npm install            # install dependencies
npm run dev            # local dev at http://localhost:3000
npm run build          # production build, exports static site to out/
npm run lint           # eslint (flat config, next/core-web-vitals + next/typescript)
npm test               # truth-guard tests over src/data
```

`serve out/` after a build to preview the static export.

## Structure

- `src/app`: routes `/`, `/services/[slug]`, `/work`, `/about`, `/contact`, plus `sitemap.ts`, `robots.ts`, the build-time OpenGraph image, and the favicon
- `src/components`: view layer (portrait scroll hero, receipts strip, DNS panel, compose CTA)
- `src/data`: the only place content lives, guarded by `truth.test.ts`
- `src/assets/og`: Inter TTF subsets used by `next/og` (network-free OG image render)
- `PRODUCT.md` / `DESIGN.md`: product truth and the Delivered design system
- `AUDIT.md`: the 2026-09 audit and redesign changelog
- `legacy/`: pre-redesign static site, kept for reference

## Content rules

All copy comes from verified Upwork profile data. No invented metrics, no
placeholder logos, no fake testimonials. Quarantined figures stay out of the
UI until they have evidence (see PRODUCT.md). Demo surfaces (inbox
simulation, DNS table) are labeled and use reserved domains. The banned-claim
list lives in `src/data/truth.test.ts`; run `npm test` after touching any
copy.

## Deploy

GitHub Pages (via the Actions workflow with `GITHUB_ACTIONS=true`, which sets
the `/portfolio` base path) or any Node host / Vercel. Set
`NEXT_PUBLIC_SITE_URL` to the production origin so `sitemap.xml`,
`robots.txt`, and OpenGraph metadata use absolute URLs.
