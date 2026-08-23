# Nayeemur Rahman — Portfolio

Portfolio site for an email deliverability specialist. Built around one idea:
the site itself behaves like a healthy inbox — everything lands, nothing goes
to spam.

## Stack

- Next.js 15 (App Router, static-friendly)
- React 19, TypeScript strict
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- lucide-react icons, Vitest for the data truth guard
- No client-side tracking, no heavy animation libraries — CSS motion only

## Commands

```bash
npm install     # install dependencies
npm run dev     # local dev at http://localhost:3000
npm run build   # production build
npm test        # truth-guard tests over src/data
```

## Structure

- `src/app` — routes: `/`, `/services/[slug]`, `/work`, `/about`, `/contact`
- `src/components` — view layer (header, hero inbox simulation, DNS panel, compose CTA)
- `src/data` — the only place content lives; guarded by `truth.test.ts`
- `PRODUCT.md` / `DESIGN.md` — product truth and the “Delivered” design system
- `legacy/` — pre-redesign static site, kept for reference

## Content rules

All copy comes from verified Upwork profile data. No invented metrics, no
placeholder logos, no fake testimonials — enforced by `npm test`.

## Deploy

Any Node host or Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production origin
so `sitemap.xml`, `robots.txt`, and OpenGraph metadata use absolute URLs.
