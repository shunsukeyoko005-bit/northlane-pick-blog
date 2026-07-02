# North Lane Pick Blog — Cloud Automation Rules

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Site: https://northlanepick.com

## Each run (9am / 3pm / 9pm JST slot)

Publish **exactly one** article per run. If this slot should not publish today, **exit without commit or push** and report `SKIPPED: <reason>`.

**Do NOT open a pull request. Push directly to main.**

---

## Slot decision (run this FIRST)

Use **JST calendar date** for `today`. Count `today_count` = rows in `_progress.yaml` → `published` where `date` equals today.

### Daily limits by date range

| Date range (JST) | `daily_min` | `daily_max` |
|------------------|-------------|-------------|
| through 2026-07-14 | 2 | 3 |
| 2026-07-15 – 2026-07-31 | 3 | 4 |
| 2026-08-01 onward | 4 | 5 |

### Slot rules (exact)

| Slot | JST time | **RUN** when | **SKIP** when |
|------|----------|--------------|---------------|
| Morning | 9:00 | `today_count == 0` | `today_count >= daily_max` |
| Afternoon | 15:00 | `today_count == 1` and `daily_min >= 2` | `today_count == 0` OR `today_count >= 2` |
| Evening | 21:00 | `today_count == 2` and `daily_max >= 3` | `today_count < 2` OR `today_count >= 3` |

The automation prompt includes which slot this run is. **Honor the slot table above.**

---

## Publish steps (only if slot says RUN)

1. Read `_progress.yaml`, `AUTOMATION.md`, and `IMAGES.md`. Apply slot decision.
2. Pick **one** title from `backlog` (prefer `sunscreen-spf` until balanced).
3. Write `src/content/blog/<slug>.md` matching existing article frontmatter style.
4. **Images (required):** Run `npm run covers` → creates `public/images/covers/<slug>.svg`.
   - If a matching Pinterest photo exists, use `public/images/covers/<slug>.jpg` and set `cover_image` in frontmatter instead (see `IMAGES.md`).
   - **Never push without a cover file.**
5. Content rules:
   - `affiliate_tag: northlanepick-20` (never `northlanepicks-20`)
   - Links: `https://www.amazon.com/dp/{ASIN}?tag=northlanepick-20`
   - No fabricated ASINs — use `verified_asins` or Amazon search links
   - US English · beauty/skincare only · affiliate disclosure top and bottom
   - No prices in body — "Check current price on Amazon"
6. `npm run build` — must pass.
7. Grep built output for `northlanepick-20`; confirm no `northlanepicks-20`.
8. Update `_progress.yaml` `published` list (same commit).
9. `git add` new article + cover image + `_progress.yaml`.
10. `git commit -m "Add article: <slug>"`
11. `git push origin main`
12. Report: `PUBLISHED: <slug> · today's count · slot name · cover: <filename>`

### Forbidden

- 2+ articles or 2+ pushes in one run
- **Publishing without a cover image** (`public/images/covers/<slug>.*`)
- Opening a pull request (push to `main` directly)
- Publishing outside the slot rules
- Thin / duplicate cluster spam
- Mixing other brands (PawThrive, cleanpup, FBA, Get Arigato)
