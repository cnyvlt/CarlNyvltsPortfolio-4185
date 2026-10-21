# Carl Nyvlt — UX/UI Designer Portfolio

A portfolio website for Carl Nyvlt, a UX/UI designer with 20+ years of experience across web, web applications, tablet and mobile. The site presents 12 case studies, a services offer, a 32-name client list, bio and contact details. Web only (React + Vite + Hono, served on port 4200).

Visual direction: **Warm Editorial**. Bone paper, never white. A high-contrast serif carrying every heading at weight 400. A neutral grotesque for all prose and letterspaced small-caps labels. Hairline rules doing the work that boxes and shadows do elsewhere. One blue accent, on links and focus rings only. Handwritten marginalia for the assistant's asides.

This is the implementation of the **Warm Editorial** design system — the source of truth for the identity is the `warm-editorial` design-system package (`SKILL.md` + `style.css` + `assets/`). Change the system there first, then mirror it here.

## Brand & Colors

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#F4F1EA` | Page background |
| `--paper-deep` | `#EBE7DC` | Alternating bands, panel blocks, user message bubble |
| `--panel` | `#EBE7DC` | Image beds and inset blocks |
| `--surface` | `#FAF8F3` | Agent panel, floating surfaces |
| `--ink` | `#1A1917` | Display and body text |
| `--ink-soft` | `#5F5E59` | Body copy, captions, secondary meta (5.8:1) |
| `--ink-faint` | `#6B6A64` | Labels, numbering (4.8:1 — the AA floor) |
| `--hairline` | `#DDD8CD` | 1px rules, grid dividers, table lines |
| `--hairline-strong` | `#C8C2B5` | Buttons, emphasised dividers |
| `--accent` | `#3F6CBF` | Links, focus ring, active filter, active nav dot (4.5:1) |
| `--accent-strong` | `#2F5499` | Hover, small accent text (6.5:1) |
| `--accent-pale` | `#DBE4F4` | Inline-link underline |
| `--mark` | `#FCF4AC` | Highlighter — text selection only |
| `--note` | `#A5654A` | Marginalia handwriting |

Light only. No dark mode: the identity is a printed-page system and the imagery is light UI screenshots.

Contrast is not a taste decision — do not lighten `--ink-faint` or `--accent`, and never introduce a second accent colour.

## Typography

Self-hosted in `packages/web/public/fonts/` (`fonts.css` linked from `index.html`). All four are SIL Open Font License 1.1.

- **Display** — `Playfair Display` 400. Headlines, project titles, section openers, client names. Always weight 400 — emphasis is size, never weight. Tracking near zero, leading `1.04`–`1.18`.
- **Text & UI** — `Archivo` 400/500/600. Paragraphs, nav, buttons, forms, letterspaced small-caps labels. Leading `1.65`, measure capped at ~62ch. Never above 600.
- **Metadata** — `IBM Plex Mono` 400/500. Numbering, dates, tools, counters, the assistant's tool-call lines. Never prose.
- **Marginalia** — `Caveat` 400. One job: the handwritten aside. The "Ask about this" links and the assistant's own notes. Never a heading, body copy, button or nav item.

Scale:
- `display-xl` `clamp(2.5rem, 4.6vw, 4rem)` — hero statement
- `display-l` `clamp(2rem, 4.6vw, 3.75rem)` — page titles, section openers
- `display-m` `clamp(1.5rem, 2.6vw, 2.25rem)` — list rows, project names
- `display-s` `clamp(1.25rem, 1.8vw, 1.6rem)` — client names, header wordmark
- `body` `1rem / 1.65`, `body-lg` `1.125rem / 1.6`, `small` `0.875rem`
- `label` `0.6875rem` uppercase, `0.2em` tracking, weight 600 (Archivo)
- `meta` `0.6875rem` uppercase, `0.12em` tracking (IBM Plex Mono)
- `note` `1.375rem` (Caveat)

## Layout & Grid

- Page gutter: `clamp(1.25rem, 4vw, 4.5rem)`; content max-width `1560px`.
- 12-column grid; hero and section openers sit in columns 1–8, imagery in 7–12, never centered.
- Vertical rhythm: sections separated by a full-width hairline and `clamp(4.5rem, 9vw, 9rem)` of air.
- Numbered rows and hairline tables instead of cards for lists: work index, services, clients.
- Panel blocks are flat rectangles of `--panel`, never rounded, never shadowed. `--radius` is `0px` throughout.

## Components

- **Header** — sticky, paper background, hairline under. Wordmark in the display serif, role beside it in a label; grotesque nav right, active route marked with the accent dot.
- **Section label** — uppercase Archivo, `0.2em` tracking, preceded by a 24px hairline segment.
- **Work list** — full-width hairline rows: mono index, project title in display serif, client right-aligned in a label. Hover swaps a preview image into a fixed panel in the right column.
- **Case-study gallery** — images on `--panel` beds with hairline captions, click opens a lightbox (arrow keys, esc, click-outside).
- **Meta table** — two-column hairline table: Client / Disciplines / Tools.
- **Filter chips** — label-style text buttons, hairline underline, accent underline when active.
- **Marginalia link** — `Caveat` in `--note`, rotated ~1°, underline on hover. Used for "Ask about this project" / "Ask about this service".
- **Assistant panel** — `--surface` with a `--hairline-strong` border, fixed bottom-right on every page. Its launcher is a bordered surface button, matching the site's only other button style.

## Motion

One orchestrated entrance per page: staggered `fade-up` (12px, 620ms, `cubic-bezier(0.16,1,0.3,1)`) on headline, paragraph, then imagery, driven by CSS animation delays. Scroll sections use a single `useReveal` IntersectionObserver that adds `.is-in` once. Hover transitions are 180ms opacity/translate/colour only. All motion is disabled under `prefers-reduced-motion`.

## Pages

| Route | Content |
|-------|---------|
| `/` | Hero statement + portrait, selected work list, featured case strips, services summary, client band, contact |
| `/work` | All 12 projects, discipline filters, asymmetric two-column index with thumbnails |
| `/work/:slug` | Case study: client, context, task breakdown, tools, gallery + lightbox, prev/next |
| `/services` | Four services in detail, process sequence, engagement note |
| `/about` | Portrait, 20-year bio, disciplines, tools, client band |
| `/clients` | Full 32-name client list as a numbered hairline table |
| `/contact` | Email, phone, availability line, direct mailto |

## Content rules

All copy is Carl's own, carried over from his existing site and lightly tightened — client names, project context, task lists and tool lists are verbatim in substance. Nothing invented: no fake metrics, testimonials, dates or awards. Contact details are his: `carlnyvlt@gmail.com`, `1.604.345.1551`.
