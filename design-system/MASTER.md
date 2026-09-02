# North Lane Pick — Design System

> ui-ux-pro-max · Fresh summer editorial beauty affiliate blog  
> Updated 2026-09-02 — vivid coral + teal (left cream/terracotta behind)

## Pattern
Editorial Grid / Magazine — colorful hero, gradient-border cards, readable article column.

## Style keywords
Vibrant editorial · coral/rose CTA · teal secondary · sunny accent · Fraunces display

## Colors
| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#FFF7F2` | Warm peach page wash |
| `--surface` | `#E8F8F6` | Cool teal surface |
| `--surface-warm` | `#FFF0E8` | Warm surface |
| `--card` | `#FFFFFF` | Post cards |
| `--ink` | `#0F172A` | Headings, body |
| `--muted` | `#475569` | Meta, excerpts |
| `--accent` | `#E11D48` | Primary CTA / SPF pills |
| `--accent-2` | `#0D9488` | Teal / routine pills |
| `--sun` | `#F59E0B` | Sunny accent in gradients |
| `--line` | `#FCD5C4` | Soft coral dividers |

## Typography
- **Display / brand:** Fraunces
- **UI / body:** Source Sans 3
- ❌ Avoid Inter / default system-only stacks as the hero type

## Effects
- Fixed multi-radial page background (coral + teal + sun)
- Hero mesh gradient + soft orbs
- Cards: gradient border, lift on hover (no layout-shift scale of the card box itself beyond 3px translate)
- Amazon CTA: coral→rose gradient pills

## Anti-patterns (do not revert to)
- Cream `#F4F1EA` + terracotta accent + Playfair (old “AI beauty blog” look)
- Purple-on-white / purple-to-indigo themes
- Flat single-color beige backgrounds
- Emoji as icons

## Cover / product images
See `IMAGES.md`. **Do not** download Amazon listing photos into the repo (Associates risk). Prefer own photos, licensed stock, or PA-API embeds after qualification.

## Phase checklist
- [x] Sticky header · colorful card grid · article hero · affiliate CTAs
- [x] Vivid coral/teal redesign (2026-09-02)
- [ ] Cover pipeline: stop unlabeled AI bottles; migrate to real/lifestyle photos
