# Automation prompt — copy into Cursor Automations (3 slots)

> Repo: `shunsukeyoko005-bit/northlane-pick-blog` · Branch: `main` · Compute: **Cloud**
> Rules: `AUTOMATION.md` · Images: `IMAGES.md`

## Shared prompt (change only the Slot line per automation)

```
North Lane Pick blog — ONE article per run. You MUST finish with git push to main.

Read AUTOMATION.md, IMAGES.md, COPY-INTRO-DIAGNOSIS.md, and _progress.yaml FIRST.

1. Apply the slot decision table in AUTOMATION.md.
   - If SKIP: exit without git push. Report: SKIPPED: <reason>
   - If RUN: continue — you MUST push one article before ending.

2. Pick one backlog title (any cluster if preferred is empty). Write article + JPG cover per IMAGES.md.

3. npm install (if needed) → npm run build → npm run verify-publish -- <slug>
   - verify-publish MUST pass (cover_image + .jpg required). Fix until OK.

4. git add article + public/images/covers/<slug>.jpg + _progress.yaml
   git commit -m "Add article: <slug>"
   git push origin main
   - Retry push once on failure. Report FAILED if push still fails.

FORBIDDEN: pull request · SVG-only cover · stopping before push · 2+ articles per run.

Slot: <SLOT LINE BELOW>
```

### Slot lines

| Automation | Slot line |
|------------|-----------|
| 9am JST | `Slot: 09:00 JST (morning — RUN if today_count == 0)` |
| 3pm JST | `Slot: 15:00 JST (afternoon — RUN if today_count == 1 and daily_min >= 2)` |
| 9pm JST | `Slot: 21:00 JST (evening — RUN if today_count == 2 and daily_max >= 3)` |

### Cron (UTC)

| JST | Cron |
|-----|------|
| 9:00 | `0 0 * * *` |
| 15:00 | `0 6 * * *` |
| 21:00 | `0 12 * * *` |
