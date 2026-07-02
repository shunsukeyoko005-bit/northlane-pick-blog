# North Lane Pick Blog — Cloud Automation Rules

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Site: https://northlanepick.com

## Each run (9am / 3pm / 9pm JST slot)

Publish **exactly one** article per run. If this slot should not publish today, **exit without commit or push** and report `SKIPPED: <reason>`.

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

**Examples (through 2026-07-14, daily_min=2, daily_max=3):**

- 9:00 with `today_count=0` → **RUN** (article #1)
- 15:00 with `today_count=1` → **RUN** (article #2)
- 21:00 with `today_count=2` → **RUN** (article #3)
- 15:00 with `today_count=0` → **SKIP** (morning missed — do not backfill here)
- 21:00 with `today_count=1` → **SKIP** (only 2 articles today is OK)

The automation prompt includes which slot this run is. **Honor the slot table above.**

---

## Publish steps (only if slot says RUN)

1. Read `_progress.yaml` and apply slot decision.
2. Pick **one** title from `backlog` (prefer `sunscreen-spf` until balanced).
3. Write `src/content/blog/<slug>.md` matching existing article frontmatter style.
4. Content rules:
   - `affiliate_tag: northlanepick-20` (never `northlanepicks-20`)
   - Links: `https://www.amazon.com/dp/{ASIN}?tag=northlanepick-20`
   - No fabricated ASINs — use `verified_asins` or Amazon search links
   - US English · beauty/skincare only · affiliate disclosure top and bottom
   - No prices in body — "Check current price on Amazon"
5. `npm run build` — must pass.
6. Grep built output for `northlanepick-20`; confirm no `northlanepicks-20`.
7. Update `_progress.yaml` `published` list (same commit).
8. `git add` new article + `_progress.yaml` only.
9. `git commit -m "Add article: <slug>"`
10. `git push origin main`
11. Report: `PUBLISHED: <slug> · today_count after push · slot name`

### Forbidden

- 2+ articles or 2+ pushes in one run
- Publishing outside the slot rules (e.g. afternoon run when `today_count=0`)
- Thin / duplicate cluster spam
- Mixing other brands (PawThrive, cleanpup, FBA, Get Arigato)
