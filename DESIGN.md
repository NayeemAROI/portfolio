# The built world: AUTH PASS

Recorded from the shipped code on 2026-08-23, not from the spec. Where this file
and `docs/superpowers/specs/2026-08-23-portfolio-redesign-design.md` disagree,
this file is what actually exists.

**Thesis.** The page is a mail header that passes. It refuses the consultant
hero, the KPI row, and the card grid this category ships.

**Mode.** Persuade. The offer sits in the `Subject:` line and the primary action
is the `Reply-To:` field, so conversion lives inside the form's own vocabulary.

---

## Palette

Defined in `app/globals.css:20`. Contrast computed from the hex values, not
sampled from a render.

| Token | Value | Role | On `--ground` |
|---|---|---|---|
| `--ground` | `#F4F5F7` | Page surface, cold blue-shifted white | — |
| `--ink` | `#000000` | All display and body type | ~20:1 |
| `--ink-2` | `#4A4F57` | Secondary, tinted from the ground's hue | 7.5:1 |
| `--pass` | `#FFB000` | Signal amber, **fill only** | 1.9:1 |
| `--fail` | `#FF2E63` | Magenta, **display size only** | 3.3:1 |
| `--fail-ink` | `#C4183C` | Body-size fail labels | 5.4:1 |
| `--rule` | `#D3D7DD` | Hairline section rules | — |
| `--rule-strong` | `#000000` | Structural rules | — |

**Two rules that break most often.** `--pass` is never type: text sitting on
amber is `--ink` at ~11:1. `--fail` is never body size; anything under 24px uses
`--fail-ink`.

Strategy is **Full palette**, four named roles. Light was chosen from the use
scene, not category habit: this is read at a desk mid-morning by someone who was
just told their mail lands in spam. Diagnostics are read on paper-white.

No dark mode. The light ground is a decision, not a default to invert.

## Type

- **Martian Mono** (`--font-mono`) for header fields, verdicts, record keys,
  timestamps, tags, and ratings. Mono is earned: this is literal machine output,
  not a costume for "technical."
- **Inter Tight** (`--font-sans`) for the h1, section headings, and all prose.
- Both self-hosted at build through `next/font/google`. No runtime request to
  Google, no layout shift from a third-party font swap.
- `font-variant-numeric: tabular-nums` on every mono surface.

| Role | Size | Tracking |
|---|---|---|
| Verdict (largest on page) | `clamp(2.25rem, 9vw, 5.25rem)` | -0.03em |
| h1, the subject line | `clamp(1.375rem, 3.6vw, 2.5rem)` | -0.02em |
| h2 | `clamp(1.625rem, 4.4vw, 2.75rem)` | -0.025em |
| Close offer | `clamp(1.5rem, 4.4vw, 2.75rem)` | -0.025em |
| Prose | `clamp(1rem, 1.6vw, 1.125rem)` | — |
| Record key | 0.875rem | -0.01em |
| Header field | `clamp(0.75rem, 1.4vw, 0.875rem)` | +0.02em |
| Tag / vkey | 0.6875rem | +0.06 to 0.08em |

Display ceiling 5.25rem, under the 6rem cap. Tracking floor -0.03em, inside
-0.04em. Prose measures: `.prose` 68ch, `.rec-body` 62ch, `.subject` 30ch,
`h2` 26ch, `.close-offer` 28ch.

**Size is not hierarchy here.** The verdicts are the largest type on the page and
are `<p>` elements; the `<h1>` is the subject line. One h1, `h2` per section,
`h3` per engagement.

## Component grammar

**There are no cards.** Structure is header lines and record rows, separated by
hairline rules. Elevation is declared once, as a border, never border plus
shadow. There are no shadows in the stylesheet at all.

- `.hdr` / `.hdr-field` — the fold's header lines.
- `.verdict` / `.verdict-main` / `.stamp` — verdict block, amber as fill.
- `.records` / `.rec` — the page's one structural repeat. Single column under
  900px, then a 16rem key column beside a flexible body column.
- `.replyto-link` — the only button-shaped element on the page. Amber fill, 1px
  ink border, inverts to ink-on-ground on hover and focus.
- `.strip` — sticky field-jump bar, appears **after** the fold, never in it.
- `.quote` — 1px ink left border. The only left border in the build, and it is
  1px, so it does not trip the colored-side-stripe refusal.

## Spacing

4-unit base, `--s1` (0.25rem) through `--s10` (10rem). Rhythm is deliberate
rather than uniform: `.sec` runs `7rem` top and `4.5rem` bottom, so every heading
gets more space above it than below. Section density alternates dense, quiet,
dense, quiet, dense, quiet, dense.

`.wrap` is `min(1180px, 100% - 3rem)`.

## Motion

One authored moment, nothing else animates.

Header lines resolve top to bottom, 90ms per step, 420ms each,
`cubic-bezier(0.16, 1, 0.3, 1)`. The three `pass` verdicts stamp in via
`clip-path: inset(0 100% 0 0)` wiping left to right, 300ms, offset one step
behind their line. Content is fully visible in the default state, so a failed
script cannot hide the page.

No section fades. No scroll reveals. No hover lifts. Link hover is a 120ms
background fill.

`prefers-reduced-motion: reduce` removes the stagger and the clip-path wipe, and
disables smooth scrolling. **The amber verdict fill stays**, because it carries
state and state must survive reduced motion.

## Browser surfaces

Themed from the palette rather than left at browser defaults:
`::selection` amber on ink, caret amber, focus ring 2px solid ink at 2px offset,
thin slate scrollbar on ground, link underline at 0.2em offset and 1px
thickness, tabular numerals on all data.

## What is deliberately absent

No eyebrow or kicker anywhere. No metric row. No card grid. No gradients, no
glass, no blur, no shadows, no emoji icons, no section numbers, no radial glow.
No CSS framework, no component library, no animation library, no analytics.

## Unverified in this record

Written without a browser. These need a rendered check before anyone treats them
as green: motion smoothness on real hardware, Martian Mono's actual line breaks
at 320px (computed to fit at ~245px inside a 272px container, which is tight),
the font-fallback swap, and whether the fold's density reads as confident or
cramped.
