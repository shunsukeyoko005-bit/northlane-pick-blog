# Automation prompt — copy into Cursor Automations (3 slots)

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Branch: `main` · Compute: **Cloud**
> Rules: `AUTOMATION.md` · Images: `IMAGES.md`

## Shared prompt (change only the Slot line per automation)

```
North Lane Pick blog — ONE article per run. You MUST finish by pushing the current commit to main.

Read AUTOMATION.md, IMAGES.md, COPY-INTRO-DIAGNOSIS.md, VOICE.md, and _progress.yaml FIRST.
Stay inside this repo only. Do not look for files outside the repository.

1. Apply the slot decision table in AUTOMATION.md (catch-up is allowed).
   - If SKIP: exit without git push. Report: SKIPPED: <reason>
   - If RUN: continue — you MUST push one article before ending.
   - Never SKIP for "SEO pause", empty preferred cluster, missing external files, or secretary SEO/schema/title work.
   - Do not stop the 9/15/21 JST cadence. Empty backlog is not a stop. Catch up when the slot table says RUN.

2. Pick one backlog title (any cluster if preferred is empty). Write article + JPG cover per IMAGES.md + VOICE.md.

3. npm install (if needed) → npm run build → npm run verify-publish -- <slug>
   - verify-publish MUST pass (cover_image + .jpg required). Fix until OK.

4. git add article + public/images/covers/<slug>.jpg + _progress.yaml
   git commit -m "Add article: <slug>"
   git push origin HEAD:main
   - Cloud Agent may be on a cursor/... branch. HEAD:main is mandatory; never use `git push origin main`.
   - If remote main advanced: git fetch origin main → git rebase origin/main → retry `git push origin HEAD:main`.
   - Retry once on any other failure. Report FAILED if push still fails.

FORBIDDEN: pull request · `git push origin main` · SVG-only cover · blank all-white design-less bottle covers · stopping before push · 2+ articles per run · scene-SPF titles · dead ASINs in `_progress.yaml` `dead_asins` (never `B00TTD9CR8`; CeraVe cream is `B01HVLKZ9Q`).

Slot: <SLOT LINE BELOW>
```

### Slot lines

| Automation | Slot line |
|------------|-----------|
| 9am JST | `Slot: 09:00 JST (morning — RUN if today_count < 1)` |
| 3pm JST | `Slot: 15:00 JST (afternoon — RUN if today_count < 2; catch up if morning missed)` |
| 9pm JST | `Slot: 21:00 JST (evening — RUN if today_count < 3; catch up if earlier slots missed)` |

### Cron (UTC)

| JST | Cron |
|-----|------|
| 9:00 | `0 0 * * *` |
| 15:00 | `0 6 * * *` |
| 21:00 | `0 12 * * *` |
