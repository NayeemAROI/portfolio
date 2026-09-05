# DESIGN.md: the Delivered world

The site is a personal client-acquisition portfolio, not a fictional agency. Its subject is email deliverability: real portrait, postmaster proof, DNS records and an email compose surface. The older generic dark-SaaS blue-gradient look remains an anti-reference.

## Current revision: 6 September 2026
This is a refinement of Delivered, not the Liquid Portfolio concept. The real portrait leads, while the interface no longer waits for canvas or JavaScript to reveal content. See `docs/audits/2026-09-06-portfolio.md` and the implementation plan for evidence and scope.

## Palette
| Token | Value | Role |
| --- | --- | --- |
| paper | #FAFAF7 | reading background |
| paper-subtle | #F2F1EC | subtle light surface |
| ink | #101418 | primary light-surface text |
| muted | #5B6470 | secondary light-surface text |
| line | #E3E1DA | light boundaries |
| card | #FFFFFF | existing raised surfaces |
| term | #0B0E11 | portrait, compose and report ground |
| term-surface | #13171D | inputs and secondary dark surfaces |
| term-ink | #E8EDF2 | dark-surface text |
| term-muted | #828D99 | dark-surface metadata and input boundaries |
| term-line | #1F252B | dark dividers |
| delivered | #1FA55A | existing action/success accent |
| delivered-ink | #187F46 | green text on paper |
| delivered-bright | #34D07C | dark-surface accent and revised primary controls |
| warm | #E8A13C | diagnostic attention only |
| spam | #E0533D | diagnostic failure only |

Green means action or delivered state; it is not an invented KPI. Amber/red stay in real diagnostic motifs. No new brand colors were introduced. Portrait caption fields use terminal at 88% opacity to protect contrast across the rotating photographs; they have no blur, halo or decorative glass treatment.

## Typography
Fonts remain self-hosted: Bricolage Grotesque Variable for display, Inter Variable for body/UI, JetBrains Mono Variable for data. No runtime Google Fonts request.

Current hero: 40px to 72px via `clamp(2.5rem, 5.5vw, 4.5rem)`, weight 700, line height 1.05, tracking -0.03em, balanced and capped at 16ch. Body 16px at 1.65. Hero actions 15px/600. Presence and form labels 14px; revised inputs 16px to avoid mobile focus zoom. Contact heading 32px to 48px, weight 600, line height 1.12 and -0.025em tracking. Older sections retain their existing data labels and mono motifs; this refinement does not claim a full typography migration.

## Signature and hierarchy
1. Real black-and-white portrait cover: real responsive image first, optional 180-frame scroll sequence second. Copy stays in document flow on matte caption fields. The unnecessary rotation dial, frame counter and loader status no longer compete with hiring.
2. Postmaster strip directly after the hero: verified profile figures remain in the data layer and were not changed.
3. DNS diagnostic record table: existing meaningful technical evidence, not decoration posing as evidence.
4. Compose contact surface: persistent field labels, explicit preparation, user-activated email-app link and manual-copy alternative. It never claims to send or to detect an external mail client's launch.

## Layout and components
Container: 1152px outer maximum, 24px inline gutters in the revised hero/contact sections. Contact spacing grows from 64px to 96px; at 1024px it uses a 5/6 asymmetric split and 80px gap. Name/company fields split at 600px. Groups use 8/12/16/24px spacing. Hero caption padding 20px, presence padding 8px/12px.

Compose radius 14px, input radius 8px, revised buttons 12px. Form inputs/actions are at least 48px tall; header controls are at least 44px. Header's dark state has an opaque terminal ground, not light text depending on the page behind it. Visible focus rings use green-ink on paper and bright-green on terminal. Selection, caret, underline offset and scrollbars are themed.

## Motion and fallback contract
At >=768px width and >=760px height, without reduced motion or a light/data-saver connection, the 180 frames map to a 220svh scene. The stage sticks below the 64px header. Narrow/short viewports, reduced motion, data saver and missing canvas use a static portrait with natural content height. A services link bypasses the cover.

One pending image, a 20-frame decoded cache, device-pixel ratio capped at 1.5, no whole-sequence background warming and no per-scroll React HUD updates. Scroll work is requestAnimationFrame-coalesced; offscreen/hidden-tab updates are skipped. Live motion preference changes return to the static image. Detached image handlers cannot update an unmounted component; already-issued network requests are not claimed to be aborted.

Reading content is visible before JS. Existing reveal wrappers remain compatible but do not hide content. Small legacy dot/blink animations finish after three cycles and are disabled for reduced motion. Control feedback remains 180ms color/background changes; no universal 0.01ms transition kill-switch.

## Content and imagery boundaries
No stock photos, fake client logos, invented clients or invented metrics. Use the existing real portrait and verified data. No files in .agent/ or .claude/ were changed. The separate Liquid Portfolio illustrative concepts are not proof of client work and were not imported.

## Verification boundary
Tests, lint, TypeScript, static build and real exported-site Chromium checks are required before merge. Screenshot evidence is stored by CI; physical iOS Safari/Android and sustained GPU performance remain unmeasured. This record describes the implementation, not a promise of universal device performance or whole-site WCAG certification.
