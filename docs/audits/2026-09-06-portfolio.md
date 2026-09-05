# Portfolio follow-up audit, 6 September 2026

Scope: current Next.js portfolio, with implementation changes concentrated on the home portrait, shared reading visibility, header hit areas and contact path. Baseline: `46c4fed`. This is not the unrelated Liquid Portfolio ClickUp artifact and does not import its concept work.

## Scorecard
Scores are code-review judgments, not Lighthouse results or a WCAG certification. Browser release checks are described separately and their actual status is recorded on PR #14.

| Dimension | Before / 4 | Current / 4 | Decisive finding |
| --- | ---: | ---: | --- |
| Accessibility | 1 | 3 | Reading content no longer depends on JS; real labels, native validation and visible keyboard focus in the revised contact path |
| Performance | 2 | 3 | Removed full-sequence background warming and per-scroll React state updates; bounded on-demand image queue |
| Theming | 3 | 3 | Existing Delivered palette and self-hosted type retained; older sections remain outside a full visual-system cleanup |
| Responsive design | 2 | 3 | Normal-flow hero copy, static narrow/short-screen portrait, 16px form fields and 44px+ revised controls |
| Implementation integrity | 2 | 3 | Honest email preparation, copy-denial recovery, and explicit CI/release gates |
| **Total** | **10 / 20** | **15 / 20** | Good at this audited scope, not a claim that every page and device is fully audited |

## Implementation integrity verdict
**Pass at the revised path's scope.** Real identity, profile data, routes, assets and dependencies are preserved. No new marketing claims, clients, metrics, backend or tracking were introduced. A static-export portfolio still acts like a static site: it prepares a message for the visitor to send, not an imaginary delivery service.

## Executive findings
Four P1 findings and four P2 findings drove the work. No P0 was established by this audit. The highest-priority failures were hidden reading content without JS, a portrait loader that could cover the primary actions indefinitely, an unverifiable mail-client success message, and deployment without explicit regression gates.

### P1: Reading content hidden without JavaScript
Location: baseline `src/app/globals.css`, `.reveal` (opacity 0), used by `Reveal.tsx` throughout the site.
Impact: visitors could receive server-rendered content that stayed invisible if the observer or JS did not run.
Resolution: visible-by-default content. Retain component compatibility but remove reveal opacity gating and permanent `will-change`. Playbook: Refine and Ship / Harden.
Evidence: the regression test failed against baseline opacity 0 and passed after the change. Browser smoke includes a JS-disabled export check.

### P1: Portrait loading state obscured the hiring path
Location: baseline `src/components/ScrollPortraitHero.tsx`, `getContext` early return and loading overlay.
Impact: missing canvas support or unavailable JS left the overlay in front of the hero's links.
Resolution: real responsive `<picture>` first, decorative canvas second, copy always present in normal flow. Image/canvas failure falls back rather than blocking. Playbook: Harden.
Evidence: regression test pins the real image and services link with unavailable canvas.

### P1: Contact reported a mail-client outcome it could not observe
Location: baseline `src/components/ComposeCTA.tsx`, `handleSend` and the "Draft opened" status.
Impact: a visitor without an email handler could believe the handoff succeeded and lose the conversion path.
Resolution: native validated preparation followed by "Email prepared, not sent", a user-activated mailto link and a selectable plain-text draft. Clipboard rejection gives manual-copy guidance. Edited inputs invalidate the prepared snapshot. Playbook: Harden and Polish.
Evidence: regression tests cover empty input, Unicode/ampersand encoding, and clipboard denial. No email is sent by the tests.

### P1: Production deployment lacked explicit regression gates
Location: `.github/workflows/deploy-pages.yml`.
Impact: content-truth regressions could ship without tests; no PR workflow guarded this path on main.
Resolution: tests, ESLint and TypeScript run before the production build/deploy. PR CI additionally runs Chromium against the actual exported site. Playbook: technical release hardening.

### P2: Reduced motion retained 300vh of portrait scroll
Location: baseline portrait section `h-[300vh]` and the reduced-motion branch.
Impact: motion was disabled but the visitor still traversed a long static scene.
Resolution: static normal-flow composition for reduced motion, data saver, narrow or short viewports; 220svh enhancement only at >=768px width and >=760px height. Live preference changes collapse the scene. A direct services link bypasses the cover. Playbook: Fix and Adapt / responsive.

### P2: Unnecessary frame work and breakpoint cache races
Location: baseline portrait `warmCompressedCache`, `preloadAround`, `resetForBreakpoint`.
Impact: full-sequence background fetching and async loads could survive cache resets; frame HUD state caused React work for scroll events.
Resolution: one pending image, at most 20 decoded cached frames, requestAnimationFrame coalescing, lifecycle-detached callbacks, no full-sequence warming, and no per-frame React state. Desktop-only enhancement avoids mobile frame decoding. A request already issued may finish downloading after its handlers are detached; no claim of network-level cancellation is made. Playbook: Fix and Adapt / performance.

### P2: Small contact inputs and transient labels
Location: baseline ComposeCTA `text-sm` inputs, placeholder-only visual labels and compact subject selector.
Impact: sub-16px inputs can trigger iOS focus zoom; disappearing labels increase memory burden.
Resolution: persistent 14px labels, 16px input text, 48px form controls and native minimum-length guidance. Playbook: Polish.

### P2: Header hit areas and portrait text depended on surroundings
Location: SiteHeader's 40px menu and transparent dark-state surface; hero over-photo text.
Impact: tight targets and variable background contrast make navigation and reading less reliable.
Resolution: header controls at least 44px; an opaque dark header treatment; matte caption fields under portrait text rather than trusting every frame's brightness. Playbook: Polish.

## Measured color evidence
WCAG relative luminance calculations on the actual token values:
- `#828d99` on `#13171d`: 5.32:1.
- `#5b6470` on `#fafaf7`: 5.74:1.
- `#187f46` on `#fafaf7`: 4.82:1.
- `#34d07c` on `#0b0e11`: 9.64:1.
- Green over an 88%-opaque terminal caption field and a worst-case white photo pixel: approximately 7.09:1 (rounded 8-bit composite).
These calculations establish those pairs, not whole-site WCAG conformance.

## Patterns and positive findings
Keep the real portrait, self-hosted type, native static export, shared data truth tests and restrained green success/action semantics. The systemic problem was treating visual enhancement as a prerequisite for content or success: the revised path makes the baseline usable and adds enhancement only when supported. Older section eyebrows and mixed small metadata sizes remain; they are not silently rebranded in this refinement.

## Verification and honest limits
Test-first commit `6f3b96e` produced five expected behavioral failures (required input, honest preparation, copy fallback, real static portrait, visible reveal content). The reduced-motion no-fetch check already passed in that baseline setup and is not represented as a newly failing test. Implementation commit `008ed05` passed `npm test`, `npm run lint`, `npx tsc --noEmit` and `npm run build` in GitHub Actions.

Browser harness: `node scripts/browser-smoke.mjs`, after building the actual `/portfolio/` static export. It checks 320/360/390/768/1440px, native invalid input, prepared message encoding, actual Tab navigation and focus, draft invalidation, page exceptions and local 4xx responses, scroll-driven canvas change, live reduced-motion fallback, no-JS reading, and mobile work/about/contact/deliverability routes. Screenshots and the concrete results are uploaded as `portfolio-browser-evidence` on each run. Consult the final PR check for the authoritative result, not this list of intended checks.

The first browser harness used pointer-initiated `.focus()` to test `:focus-visible`. Its failure was a test-method defect: programmatic focus after pointer input need not match that pseudo-class. The corrected check presses Tab and asserts that the intended link actually receives focus before checking its outline.

Playwright 1.58.2 is installed only in the CI job, without modifying package.json or package-lock.json. The sandbox cannot fetch project dependencies; its local Playwright package has no browser executable, so local browser execution was not claimed. No independent external reviewer was available: review was a fresh self-review of the full diff and evidence.

Physical iOS Safari/Android, assistive-technology hardware, sustained GPU smoothness and every older secondary component remain unverified. Screenshots captured in CI are evidence artifacts, not a claim that they were all manually inspected.

## Release decision
Merge only when the final PR head passes the complete verification job and the diff still matches this scope. Preserve #11 and #2: neither is merged or closed by this work. The selected execution path is PR #14 into main, with an expected-head check at merge time.

Recommended later work: run a rendered Design Critique on real mobile Safari, then a narrow Polish pass on the remaining secondary sections. These can be run individually or together, followed by a repeat audit; do not treat them as permission to replace the Delivered identity.
