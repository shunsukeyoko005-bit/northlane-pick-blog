# North Lane Pick — Design System (Phase 1)

> ui-ux-pro-max · Editorial beauty affiliate blog · Phase 1 = typography + cards (no images)

## Pattern
Editorial Grid / Magazine — card index, readable article column, soft warmth.

## Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#FFFDF9` | Page background |
| `--surface` | `#F6EFE7` | Hero bands, disclosure |
| `--card` | `#FFFFFF` | Post cards |
| `--ink` | `#1E293B` | Headings, body |
| `--muted` | `#475569` | Meta, excerpts |
| `--accent` | `#C98B7E` | Links, pills, borders |
| `--accent-dark` | `#A66B5F` | Hover |
| `--line` | `#E8DFD4` | Dividers |

## Typography
- **Display / brand:** Playfair Display
- **UI / body:** Inter
- Body 17px / line-height 1.75 · H1 Playfair 2.25rem

## Components (Phase 1)
- Sticky header with brand + nav
- Hero band (gradient, no image)
- Post cards: cluster pill, date, title, excerpt, hover lift
- Article hero: meta row + title + lede
- Affiliate disclosure callout

## Phase 2 (later)
- `cover_image` in frontmatter
- Product pick cards with Amazon images (Associates rules)

## Anti-patterns
- No emoji icons
- No layout-shift hover (no scale on cards — shadow/border only)
- Muted text min `#475569` for contrast
