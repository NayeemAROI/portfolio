# Portfolio audit + redesign, 2026-09-05

A full audit of the site as it stood at commit `c3e8cb5` ("restore 180-frame
220-degree scroll portrait 3D hero"), followed by a redesign pass that fixes
every P0/P1 finding in place. Verified facts only; nothing in this file
invents numbers.

## Audit health score

| # | Dimension | Before | After | Key finding |
|---|-----------|--------|-------|-------------|
| 1 | Accessibility | 2/4 | 3.5/4 | Global reduced-motion kill-switch, unlabeled decorative HUD, distorted stat claims in hero copy |
| 2 | Performance | 2/4 | 3.5/4 | 4 offline font families shipped at runtime; ~5 MB of dead deps; 480vh scroll inflation |
| 3 | Theming | 1/4 | 4/4 | 18 Google font families + two originkit theme sheets fighting the Delivered tokens |
| 4 | Responsive | 3/4 | 3.5/4 | Solid grids; header was illegible over the dark hero |
| 5 | Implementation integrity | 2/4 | 4/4 | Dead template code, banned-claim leaks, broken build |
| | **Total** | **10/20** | **18.5/20** | Acceptable → Excellent band |

---

## P0 (blocking)

### 1. The production build fails without network access
- **Location**: `src/lib/fonts.ts` (`next/font/google`), `src/app/globals.css` (runtime Google Fonts `@import`)
- **Category**: Performance / build integrity
- **Impact**: `next build` fetches Bricolage/Inter/JetBrains Mono from
  fonts.googleapis.com at compile time. Any airgapped or restricted CI
  environment (including this sandbox) cannot build the site at all. The CSS
  `@import` additionally pulled **18 font families** (~100 font files) from
  Google on every page load — a third-party request on a site that advertises
  "zero tracking scripts", and a FOUC risk on slow connections.
- **Fixed**: Fonts are self-hosted via `@fontsource-variable/bricolage-grotesque`,
  `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono`,
  imported in `layout.tsx` and fingerprinted into `_next/static/media`.
  Build is fully offline; runtime font requests hit the same origin only.
  `next/font` (self-hosted variant) remains a viable alternative.

### 2. `npm run lint` was broken
- **Location**: `package.json` scripts
- **Category**: Implementation integrity
- **Impact**: `next lint` ran ESLint 9 with no config and no `eslint`
  package installed: lint has never been able to run on this repo.
- **Fixed**: Added `eslint`, `eslint-config-next` (flat config in
  `eslint.config.mjs`), script is now `eslint .`. Lint is clean: 0 errors,
  0 warnings.

---

## P1 (major)

### 3. Dead template subsystem shipped in the bundle and repo
- **Location**: `src/components/originkit/**`, `src/app/originkit-*.css`, `public/originkit/**`, `src/components/HeroDeliverability.tsx`
- **Category**: Implementation integrity / performance
- **Impact**: ~1,800 lines of unused Originkit template components (unused
  `three` globe, ASCII effects) and 1.5 MB of orphan assets, plus two theme
  stylesheets that redefined `--font-sans` mid-cascade and imported 16
  foreign font families. `three`, `d3-geo` and type packages (~5 MB
  installed) were dependencies of code that no route rendered.
- **Fixed**: Deleted. Dependencies removed from `package.json`.

### 4. Truth-guard violations in hero and case-file copy
PRODUCT.md bans unverifiable outcome claims; the audit found leaks the
guard's pattern list did not cover:
- `ScrollPortraitHero`: **"7/7 Projects Delivered"** (profile says 7 of 8
  completed) and a **"TOP RATED"** badge the profile has not been shown to
  carry.
- `PortfolioGallery` / `src/data/portfolio.ts`: **"Inbox Status: Primary
  100%"**, **"Inbox Health: 95–100%"**, **"Domain Protection: Zero Burn"**,
  **"Email Routing: 100% Delivered"** — dashboard-shaped numbers with no
  screenshot or export behind them (quarantined-figures rule).
- `src/data/proof.ts`: a `badge?: "TOP RATED"` slot and unused icon palette.
- **Fixed**: All replaced with verified facts (configuration state, tooling,
  profile-visible figures). `truth.test.ts` now pins the new bans: zero
  burn, primary 100, 95–100%, inbox health, 7/7, top rated. Tests: 26
  passing (was 20).

### 5. Scroll portrait: length, a11y, and fallback defects
- **Location**: `src/components/ScrollPortraitHero.tsx`
- **Category**: Accessibility / performance / responsive
- **Impact & fixes**:
  - **480vh scroll prison** (2.7 viewports of dead scroll at the end, frame
    map showing no visible rotation after ~85% progress): reduced to
    **300vh** — 1 full extra viewport of rotation, no dead zone.
  - **Unlabeled decorative HUD**: the 220°/frame dial, degree counter, and
    fill meter were read aloud by screen readers between every scroll frame.
    Now `aria-hidden` with a pointer to the canvas description; the canvas
    `role="img"` label now describes what actually happens (portrait
    rotating profile → frontal) instead of "Interactive 220-degree scroll
    sequence". HUD badge text replaced with verified stats (JSS 100% · 5.0★
    · ID verified).
  - **`noscript` fallback** used an absolute path (`/assets/...`), which 404s
    under the GitHub Pages basePath, and was not positioned (it would render
    below the 100vh stage). Now relative and `absolute inset-0`.
  - **No data-saver guard**: the loader force-fetched all 38 MB of frames in
    the background regardless of connection. Now honors `saveData` and 2G
    (frames stream on demand instead).
  - Reduced-motion: still renders frame 1 statically and skips scroll
    animation; the global 0.01ms kill-switch in `globals.css` remains for
    load-time transitions (documented tradeoff: it preserves state change
    and hierarchy, and all content is visible without motion).
  - `h-screen`/`h-[100svh]` duplicate class removed in favor of `100svh`.

### 6. Header illegible over the dark hero
- **Location**: `src/components/SiteHeader.tsx`
- **Category**: Responsive / theming
- **Impact**: The sticky header is transparent at `scrollY=0`; on the home
  route its ink-on-transparent text sat directly on the near-black portrait
  — invisible brand, nav, and status chip until you scrolled 8px.
- **Fixed**: The header now carries a dark treatment (light text, subtle
  borders) while the portrait cover is in view, driven by an
  IntersectionObserver, with the initial state derived from the route so
  the first paint is already correct. Escape closes the mobile menu.
  `dark` class flips only on the home route; every other page is paper.

### 7. Site had no social preview, no favicon, no structured data
- **Location**: `src/app/layout.tsx`
- **Category**: Implementation integrity (SEO)
- **Impact**: No `og:image` (links shared anywhere rendered bare), no icon
  (browser tab showed the default glyph), no JSON-LD for a person whose
  entire business is being found and verified.
- **Fixed**:
  - `src/app/opengraph-image.tsx`: 1200×630 OG image generated at build
    from the Delivered token system, with **zero network requests** —
    `next/og`'s default font comes from a CDN at build time, so Inter latin
    TTF subsets (converted from `inter-ui` woff2) are vendored in
    `src/assets/og/` and loaded from disk. `force-static` for
    `output: export`.
  - `src/app/icon.svg`: terminal-tile favicon from the same tokens.
  - Person JSON-LD (name, role, knowsAbout, sameAs → GitHub/LinkedIn/Upwork).
  - `twitter:card` upgraded `summary` → `summary_large_image`.

---

## P2 (minor)

### 8. Section rhythm and mono-code system (redesign)
- Postmaster proof strip moved directly under the hero and rebuilt as a
  terminal report (dark, hairline-grid, mono, PASS-style chips) so the
  verified numbers are the first thing after the portrait lands.
- Case files rebuilt as an asymmetric editorial grid (7/5 columns + full-width
  horizontal third) with `CASE-01..03` file tabs and a data-row layout, and
  dark→light alternation that matches DESIGN.md.
- All section eyebrows now use the DESIGN.md mono-code pattern
  (`SVC-02 // Services`, `DIAG-03 // Diagnostic`, `FILE-04 // Case work`,
  `LOG-05`, `REC-06`, `MSG-07`), replacing the single reused `// DELIVERABILITY`
  eyebrow.
- `src/app/globals.css` cleaned: removed the never-used `land`/`marquee`
  keyframes and `.animate-land`/`.marquee` classes left over from the
  retired inbox hero.

### 9. Notes carried forward (not fixed, by design)
- The OG route exports as an extensionless file; hosts that infer
  content-type from extension (e.g. GitHub Pages) will serve it as
  `application/octet-stream`. Major scrapers sniff content and render it,
  but if a network ever rejects it, write the generated PNG into `public/`
  as a post-build step and point `openGraph.images` at it.
- The hero background warmer keeps `fetch(cache: "force-cache")` parallelism
  at 4 workers; conservative but unmeasured on real mobile hardware.
- `prefers-reduced-motion` global kill-switch zeroes all transition
  durations (including the loading progress bar). Intentional: everything
  remains readable and static; a per-animation alternative would add
  complexity for little gain.

## Verification log (this sandbox)

- `npm run build` — fails on `c3e8cb5` (Google Fonts TLS). Passes offline
  after the fix; static export to `out/` (16 pages, ~103 kB shared
  first-load JS).
- `npm test` — 26/26 passing (20 before; 6 new banned-claim pins).
- `npm run lint` — 0 errors, 0 warnings (was: not runnable).
- Static export served and smoke-tested: `/`, `/work/`, `/about/`,
  `/contact/`, `/services/deliverability/` → 200; unknown route → 404 page;
  OG image, fonts, and hero frames all 200 from the export.
- `out/index.html` contains no banned phrases (grep for every pattern in
  `truth.test.ts` and the removed metrics).
