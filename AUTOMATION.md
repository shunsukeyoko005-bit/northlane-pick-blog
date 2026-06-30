# North Lane Pick Blog — Cloud Automation Rules

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Site: https://northlanepick.com

## Each run (9am / 3pm / 9pm JST slot)

Publish **exactly one** article per run. If daily cadence limit is reached, exit without pushing.

### Steps

1. Read `_progress.yaml` and count articles published **today** (UTC date or JST — use JST for cadence).
2. Compare against cadence limit for today's date range in `_progress.yaml`.
3. If at limit → stop (no commit, no push).
4. Pick **one** title from `backlog` (prefer sunscreen-spf cluster until balanced).
5. Write `src/content/blog/<slug>.md` matching existing article frontmatter style.
6. Rules:
   - `affiliate_tag: northlanepick-20` (never `northlanepicks-20`)
   - Links: `https://www.amazon.com/dp/{ASIN}?tag=northlanepick-20`
   - No fabricated ASINs — use verified_asins or Amazon search links
   - US English · beauty/skincare only · affiliate disclosure top and bottom
   - No prices in body — "Check current price on Amazon"
7. `npm run build` — must pass.
8. Grep built output for `northlanepick-20` and confirm no `northlanepicks-20`.
9. `git add` only the new article (+ `_progress.yaml` update).
10. `git commit` with message like `Add article: <slug>`
11. `git push origin main`
12. Update `_progress.yaml` published list and commit if not already in step 9.

### Forbidden

- 2+ articles in one run
- Thin / duplicate cluster spam
- Mixing other brands (PawThrive, cleanpup, FBA, Get Arigato)

### Slot hints

| Slot | JST | When to skip |
|------|-----|--------------|
| Morning | 9:00 | Only if daily limit already reached |
| Afternoon | 15:00 | Skip if today's count < 2 allowed AND already published morning article filling quota |
| Evening | 21:00 | Skip unless 3rd article needed for today's cadence |
