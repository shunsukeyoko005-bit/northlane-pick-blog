# North Lane Pick Blog — Cloud Automation Rules

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Site: https://northlanepick.com

## Each run (9am / 3pm / 9pm JST slot)

Publish **exactly one** article per run. If this slot should not publish today, **exit without commit or push** and report `SKIPPED: <reason>`.

**Do NOT open a pull request. Push directly to main.**

**A run is FAILED if you stop before `git push origin main` succeeds** (unless slot says SKIP).

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

## Topic pick (when slot says RUN)

> **SEO direction is secretary-controlled (2026-07-19).** See `../research/2026-07-19-seo-topic-strategy.md` for the full rationale. Do not deviate from it without a new dated research note.

1. Read `_progress.yaml` → `backlog`. Each cluster's `ideas` list is curated by the secretary — use titles from it as-is (do not rewrite the angle).
2. **Balance the two clusters** — check the count of `published` entries per cluster (by slug pattern: `sunscreen-*`/`spf-*`/`*-sunscreen-*` = sunscreen-spf; everything else = skincare-routine). Pick from whichever cluster is currently smaller. If counts are equal, prefer `sunscreen-spf`.
3. **If the preferred cluster has `ideas: []`, pick from any other cluster that has ideas.** Never abort because one cluster is empty.
4. **Do not invent new "scene" SPF titles** (e.g. "Sunscreen for [activity/event]") — that pattern is saturated (23+ published). If you must invent a title because all clusters are empty, invent a **skin-concern, life-stage, ingredient, or "Best X" comparison** title instead (matches the patterns already in the backlog), US English, beauty/skincare only.
5. Before finalizing a title, **check it against every slug in `published`** — skip if the topic is a near-duplicate (same scene/concern already covered) and pick the next backlog idea instead.
6. If all clusters are empty, invent one title following rule 4 and continue — do not SKIP for empty backlog.

---

## Publish steps (only if slot says RUN)

1. Read `_progress.yaml`, `AUTOMATION.md`, `IMAGES.md`, and **`COPY-INTRO-DIAGNOSIS.md`**. Apply slot decision.
2. Pick **one** title (see Topic pick above). Slug = kebab-case from title.
3. Write `src/content/blog/<slug>.md` matching existing article frontmatter style.
   - **Intro (required):** Diagnosis-style opening per `COPY-INTRO-DIAGNOSIS.md` — trap → cost of unchanged → bridge (3–5 short paragraphs under H1, **no affiliate links in intro**).
4. **Cover image (required — see `IMAGES.md`):**
   - Create a **real photo** `public/images/covers/<slug>.jpg` (1200×630, beauty/skincare, no text overlay).
   - Add to frontmatter: `cover_image: "/images/covers/<slug>.jpg"`
   - Run `npm run covers` for SVG fallback (optional).
   - **SVG-only covers are rejected** by `npm run verify-publish`.
5. Content rules:
   - `affiliate_tag: northlanepick-20` (never `northlanepicks-20`)
   - Links: `https://www.amazon.com/dp/{ASIN}?tag=northlanepick-20`
   - No fabricated ASINs — use `verified_asins` or Amazon search links
   - US English · beauty/skincare only · affiliate disclosure top and bottom
   - No prices in body — "Check current price on Amazon"
6. `npm install` (if needed) → `npm run build` — must pass.
7. Grep built output for `northlanepick-20`; confirm no `northlanepicks-20`.
8. Update `_progress.yaml` `published` list (same commit). Remove used title from `backlog` if listed.
9. **`npm run verify-publish -- <slug>`** — must print `OK`. Fix any FAIL before commit.
10. **Push gate (mandatory):**
    ```bash
    git add src/content/blog/<slug>.md public/images/covers/<slug>.jpg _progress.yaml
    git commit -m "Add article: <slug>"
    git push origin main
    ```
    - If push fails, fix the error and **retry push once**.
    - Do not end the run until push succeeds or you report `FAILED: <reason>`.
11. Report: `PUBLISHED: <slug> · today's count · slot · cover: <slug>.jpg · intro: diagnosis · pushed: yes`

### Forbidden

- 2+ articles or 2+ pushes in one run
- **Publishing without `cover_image` + `.jpg` / `.webp` file**
- Stopping after commit without push
- Opening a pull request (push to `main` directly)
- Publishing outside the slot rules
- SKIP because a single backlog cluster is empty
- Thin / duplicate cluster spam
- **New "scene" SPF titles** (activity/event-based) — cluster is saturated; see Topic pick rule 4
- Mixing other brands (PawThrive, cleanpup, FBA, Get Arigato)
