# nayeemurrahman.com

One-page site for email deliverability work. Next.js 15, static export, no CSS
framework, no component library.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Verify it

```bash
npm run verify   # builds, then asserts the direction contract survived
```

CI runs the same assertion plus a check that no retired claim came back into the
build. See `.github/workflows/deploy.yml`.

## Deploy

Push to `main`. The workflow builds, verifies, and publishes to GitHub Pages.

One setting is required first: **Settings → Pages → Build and deployment →
Source: GitHub Actions**. Without it the workflow builds and the deploy step
fails.

Moving to a custom domain? Delete the `PAGES_BASE_PATH` line from the workflow's
build step, since the basePath is only needed for `/<repo>/` subpath serving.

## Where things live

| Path | What |
|---|---|
| `app/content.ts` | **Every string on the page.** Edit copy here, nowhere else. |
| `app/page.tsx` | Structure: fold, chain, stack, engagements, record, close. |
| `app/globals.css` | The whole design system. Palette tokens at the top. |
| `app/layout.tsx` | Fonts, metadata, and the direction contract. |
| `DESIGN.md` | The built world, recorded from the shipped code. |
| `docs/superpowers/specs/` | The approved design spec. |

## Before this merges to main

`app/content.ts` has a `VERIFY BEFORE MERGE` block at the top. Client quotes and
dates were transcribed from a low-resolution profile screenshot, and they are
claims published in your name, so read them against your actual Upwork feedback.

Also confirm the contact address and the demonstration sending domain.

## Two rules the stylesheet will not enforce for you

1. `--pass` (`#FFB000`) is 1.9:1 on the page ground. It is a **fill**, never
   type. Text on amber is `--ink`.
2. `--fail` (`#FF2E63`) is 3.3:1, so display size only. Body-size fail labels use
   `--fail-ink` (`#C4183C`, 5.4:1).

Breaking either one is the fastest way to make this page fail accessibility while
still looking correct.
