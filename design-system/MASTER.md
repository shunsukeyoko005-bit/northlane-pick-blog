# North Lane Pick — Design System

> ui-ux-pro-max · Editorial beauty affiliate blog

## Pattern
Editorial Grid / Magazine — card index with covers, readable article column, soft warmth.

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

## Phase 1 ✅
- Sticky header · card grid · article hero · affiliate disclosure

## Phase 2 ✅
- **Cover images:** `public/images/covers/<slug>.svg` (run `node scripts/generate-covers.mjs`)
- **OG tags:** `og:image` from cover on article pages
- **Amazon CTAs:** pill-style buttons on `/dp/` and search links in article body

## Phase 3（進行中 · オーナー指示 2026-07-02）

- **毎記事カバー画像必須** — SVG 自動生成をデフォルト · Pinterest 実写真があれば上書き
- 手順: `site/IMAGES.md` · Automation プロンプトに `npm run covers` 明記済み

## Anti-patterns
- No emoji icons · no layout-shift hover · muted text min `#475569`
