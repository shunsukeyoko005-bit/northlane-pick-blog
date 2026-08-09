# North Lane Pick Blog — Cloud Automation Rules

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Site: https://northlanepick.com
>
> **All required files are inside this repo.** Do not look for `../research/` or any path outside the repository.

## Each run (9am / 3pm / 9pm JST slot)

Publish **exactly one** article per run. If this slot should not publish today, **exit without commit or push** and report `SKIPPED: <reason>`.

**Do NOT open a pull request. Push the current Cloud Agent commit directly to main.**

Cloud Agent may check out an isolated `cursor/...` branch. Therefore, **never use
`git push origin main`**: that pushes the local `main` ref and can leave the new
article stranded on the isolated branch. Always push the checked-out commit with
`git push origin HEAD:main`.

**A run is FAILED if you stop before `git push origin HEAD:main` succeeds** (unless slot says SKIP).

**Never SKIP because automation "should pause" or SEO strategy changed.** Publishing continues every day unless the slot table below says SKIP.

---

## Slot decision (run this FIRST)

Use **JST calendar date** for `today`. Count `today_count` = rows in `_progress.yaml` → `published` where `date` equals today.

### Daily limits by date range

| Date range (JST) | `daily_min` | `daily_max` |
|------------------|-------------|-------------|
| through 2026-07-14 | 2 | 3 |
| 2026-07-15 – 2026-07-31 | 3 | 4 |
| 2026-08-01 onward | 3 | 3 |

> August+ uses **3 slots → 3 articles/day**. Do not invent a 4th slot.

### Slot rules (exact) — catch-up allowed

If an earlier slot failed, later slots **must catch up** (do not leave the day at 0).

| Slot | JST time | **RUN** when | **SKIP** when |
|------|----------|--------------|---------------|
| Morning | 9:00 | `today_count < 1` and `today_count < daily_max` | `today_count >= daily_max` |
| Afternoon | 15:00 | `today_count < 2` and `today_count < daily_max` | `today_count >= 2` OR `today_count >= daily_max` |
| Evening | 21:00 | `today_count < 3` and `today_count < daily_max` | `today_count >= 3` OR `today_count >= daily_max` |

The automation prompt includes which slot this run is. **Honor the slot table above.**

---

## Topic pick (when slot says RUN)

SEO direction (secretary, 2026-07-19, still active):

- Prefer **Best X / skin-concern / life-stage / ingredient** titles
- **Do not invent new "scene" SPF titles** (e.g. "Sunscreen for [activity/event]") — that pattern is saturated
- Balance `sunscreen-spf` vs `skincare-routine` clusters

1. Read `_progress.yaml` → `backlog`. Use titles from `ideas` as-is when possible.
2. **Balance clusters** — slug patterns: `sunscreen-*` / `spf-*` / `*-sunscreen-*` = sunscreen-spf; everything else = skincare-routine. Pick from the smaller cluster. If equal, prefer `sunscreen-spf`.
3. **If the preferred cluster has `ideas: []`, pick from any other cluster that has ideas.** Never abort because one cluster is empty.
4. If you must invent a title because all clusters are empty, invent a **skin-concern, life-stage, ingredient, or "Best X"** title (US English, beauty/skincare only). Never invent a new scene-SPF title.
5. Before finalizing, check against every slug in `published` — skip near-duplicates and take the next idea.
6. If all clusters are empty, invent one title following rule 4 and continue — **do not SKIP for empty backlog**.

---

## Publish steps (only if slot says RUN)

1. Read `_progress.yaml`, `AUTOMATION.md`, `IMAGES.md`, `COPY-INTRO-DIAGNOSIS.md`, and **`VOICE.md`**. Apply slot decision.
2. Pick **one** title (see Topic pick above). Slug = kebab-case from title.
3. Write `src/content/blog/<slug>.md` matching existing article frontmatter style.
   - **Voice (required, new articles only — 2026-07-22~):** Apply busy-parent voice per `VOICE.md`.
   - **Intro (required):** Diagnosis-style opening per `COPY-INTRO-DIAGNOSIS.md` — trap → cost of unchanged → bridge (3–5 short paragraphs under H1, **no affiliate links in intro**), written in the voice above.
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
    git push origin HEAD:main
    ```
    - `HEAD:main` is mandatory because Cloud Agent may be on `cursor/...`, not local `main`.
    - If push is rejected because remote main advanced, run:
      ```bash
      git fetch origin main
      git rebase origin/main
      git push origin HEAD:main
      ```
    - Fix any other push error and **retry push once**.
    - Do not end the run until push succeeds or you report `FAILED: <reason>`.
11. Report: `PUBLISHED: <slug> · today's count · slot · cover: <slug>.jpg · intro: diagnosis · pushed: yes`

### Forbidden

- 2+ articles or 2+ pushes in one run
- `git push origin main` (wrong ref in an isolated Cloud Agent branch)
- **Publishing without `cover_image` + `.jpg` / `.webp` file**
- Stopping after commit without push
- Opening a pull request (push to `main` directly)
- Publishing outside the slot rules
- SKIP because a single backlog cluster is empty
- SKIP because "SEO pause" / "wait for strategy" / missing files outside this repo
- Thin / duplicate cluster spam
- **New "scene" SPF titles** (activity/event-based)
- Mixing other brands (PawThrive, cleanpup, FBA, Get Arigato)
