# DESIGN.md - the "Delivered" world

Replacement visual world. The old look (generic dark-SaaS blue gradient on near-black) is evidence and anti-reference, not a base.

## Concept
The site behaves like **a message that lands**. Email infrastructure is the aesthetic: inbox rows, DNS records, postmaster reports, status checks. Editorial-technical: it reads like a beautifully typeset deliverability dossier, not a marketing template.

## Palette (tokens)
Light "paper inbox" base with dark "terminal" contrast sections.

| Token | Value | Use |
|---|---|---|
| paper | #FAFAF7 | page background |
| ink | #101418 | primary text |
| muted | #5B6470 | secondary text |
| line | #E3E1DA | hairline borders (prefer 1px lines over shadows) |
| card | #FFFFFF | raised surfaces |
| term | #0B0E11 | terminal section background |
| term-ink | #E8EDF2 | terminal section text |
| term-line | #1F252B | borders on dark |
| delivered | #1FA55A | accent: success, CTAs, checkmarks (on light) |
| delivered-ink | #187F46 | green at text sizes on paper (contrast safe) |
| delivered-bright | #34D07C | accent on dark |
| warm | #E8A13C | warmup/attention accents, sparing |
| spam | #E0533D | failure states inside diagnostic motifs only |

Rules: one accent per view. Green means delivered/go. Amber and red exist only inside diagnostic motifs (spam-vs-inbox diagrams), never as decoration.

## Type
- Display: **Bricolage Grotesque** 600-800, tight leading, H1-H2 only.
- Body/UI: **Inter** 400/500/600.
- Data: **JetBrains Mono** for eyebrows, stats, labels, DNS records, timestamps.
- Scale (px, clamped): 12 / 14 / 16 / 18 / 24 / 32 / 48 / 72. Body 16 at 1.65 line height. Hero clamp(40px, 7vw, 72px).
- Mono eyebrow pattern for section labels: `MX-01 // DELIVERABILITY`.

## Signature motifs
1. **Inbox hero:** value props arrive as email rows: staggered slide + fade, 60ms stagger, then a green "delivered" check draws in. Plays once on load, no loop.
2. **Postmaster strip:** proof stats rendered as a monospace report: `health 87-100% / opens 45-53% / JSS 100%`.
3. **DNS record table:** skills and tools rendered as record rows: `TYPE / NAME / VALUE / check`.
4. **Compose CTA:** the contact block is styled as a compose window (To: Nayeemur Rahman) with a Delivered-green Send button.

## Space, layout, radius
- Container 1120px. Section padding 96px desktop / 64px mobile. 8pt spacing grid.
- Cards radius 12px, pills 999px. Borders over shadows; at most one soft shadow level.
- Terminal sections bleed full width; content stays in the container.
- Asymmetric editorial layouts allowed; never center-everything template rhythm.

## Motion
- 150-250ms, ease-out, translateY 8-12px plus fade. Stagger 60ms. SVG check draw-in 300ms.
- No parallax, no scroll-jacking, no infinite loops except one slow pausable tool marquee.
- prefers-reduced-motion: opacity-only transitions, static marquee.

## Imagery
No stock photos, no 3D blobs, no fake client logos. Real artifacts only: anonymized campaign screenshots, terminal-styled diagrams, OG images generated from the token system.

## Accessibility floor
- Contrast at least 4.5:1 body, 3:1 large text. Use delivered-ink #187F46 for green at text sizes on paper.
- Focus rings: 2px delivered, 2px offset, visible on every interactive element.
- Hit targets at least 44px. Semantic landmarks, skip link, alt text on artifacts.

## Anti-reference (never ship)
Dark-blue SaaS gradient hero, glassmorphism, purple-teal AI palette, invented KPI cards, fake logo strips, emoji bullets in UI copy, centered-everything rhythm.
