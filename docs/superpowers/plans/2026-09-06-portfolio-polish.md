# Portfolio accessibility and design polish

## Contract
Objective: preserve the Delivered identity and portrait while making the visitor-to-contact path readable, resilient, and test-gated before merging to main.
Files: src/components/ScrollPortraitHero.tsx, ComposeCTA.tsx, src/app/globals.css; tests in src/components/portfolio-polish.test.tsx; workflows .github/workflows/ci.yml and deploy-pages.yml.
Interfaces: retain existing component exports, routes, contact topics, verified profile data, 180 portrait assets, and GitHub Pages base path. Mail preparation never claims delivery or successful launch of another application.
Constraints: no new dependencies, no factual copy changes, no edits to .agent or .claude, no unrelated PR merges. Reuse native forms, links, CSS and the existing React/Vitest stack. Keep Bricolage, Inter, the green accent, portrait and compose motif.
Verification: npm test; npm run lint; npx tsc --noEmit; npm run build with NEXT_PUBLIC_SITE_URL=https://nayeemaroi.github.io/portfolio. GitHub Actions is the authoritative build environment because the execution sandbox has no internet access or installed project dependencies.

## Evidence and scope
Main at 46c4fed has a 300vh portrait even with reduced motion, a loading overlay that hides content without JavaScript/canvas, a breakpoint race in frame caching, repeated offscreen scroll work, and globally hidden reveal content. Contact says a draft opened without observing that outcome. Small inputs trigger mobile browser zoom. Deployment has no explicit lint/test gate. PR #11 was reviewed: reuse its mailto construction approach, but not its 1.6-second visibility heuristic (tab visibility does not prove an email client opened), unchecked clipboard promise, or stale package file. Leave that PR open, do not merge unrelated service-topic routing.

## Sequence
1. Commit this plan, regression tests, and a PR workflow. Run tests against unchanged implementation and observe genuine behavioral failures. The workflow runs tests before lint so red evidence is visible.
2. Implement the portrait as progressive enhancement: static picture and copy first, bounded on-demand decoded-frame cache, one pending frame request, cancellation by effect lifecycle, motion preference change handling and resize redraw. Collapse extra scroll when motion is disabled or a frame/canvas fails. Use native layout for copy so zoom and short screens cannot clip the contact action.
3. Refine the compose surface using persistent labels, native required validation, 16px inputs and 44px controls. Preparing a message reveals an explicit mailto link and selectable plain-text fallback immediately. Clipboard errors remain recoverable. No timer-based app detection, backend, or external service.
4. Make reveal content visible by default; retain one authored portrait animation rather than animate every section. Preserve token palette, improve header hit areas and short-screen rhythm, restore focus on controls, add reduced-motion alternatives. Add lint/tests/typecheck before production deployment.
5. Inspect the entire PR diff fresh, re-run gates, and merge only the exact verified head. No external reviewer is available: report self-review honestly. Browser/device visual checks not executed must remain explicitly unverified. Do not call missing or pending checks passing.

## Acceptance
Contact cannot produce a draft with an empty name or short message; valid Unicode/punctuation survive encoding; preparing is explicitly not sending; copy denial exposes manual-copy guidance. Portrait keeps a real image without JavaScript, offers a direct skip to services, loads no sequence in reduced motion, and never gates copy on image readiness. Reveal content is visible without script. Main's build remains static-export compatible.
