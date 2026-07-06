# Blog images — required on every publish

> **Owner rule (2026-07-02):** Every article must ship with a cover image. No image-less publishes.

## Required (Automation · every RUN)

Every new article **must** have:

1. **Photo file:** `public/images/covers/<slug>.jpg` (or `.webp`) — **1200×630**, beauty/skincare topic, clean editorial style, **no text on image**.
2. **Frontmatter:** `cover_image: "/images/covers/<slug>.jpg"` on the same line as other frontmatter fields (see existing articles).
3. **Verification:** `npm run verify-publish -- <slug>` must exit 0 before `git commit`.

### How to create the JPG (cloud agent)

Pick **one** method:

| Method | Steps |
|--------|--------|
| **A. Image generation** | Generate a 1200×630 skincare/beauty photo matching the article topic. Save as `public/images/covers/<slug>.jpg`. |
| **B. Repo reference** | Copy an existing `.jpg` from `public/images/covers/` as style reference; create a new unique image for the topic. |
| **C. SVG is not enough** | `npm run covers` creates `.svg` only — **never push with SVG as the only cover**. |

After JPG exists:

```bash
npm run covers          # optional SVG fallback
npm run verify-publish -- <slug>
```

## What the site uses

- Article hero + card + OG/Twitter: `cover_image` frontmatter → `public/images/covers/<slug>.jpg`
- If `cover_image` is missing, site falls back to `.svg` (looks empty — **do not rely on this**)

## Verification before push

- [ ] `cover_image` in frontmatter points to `.jpg` or `.webp`
- [ ] File exists under `public/images/covers/`
- [ ] `npm run verify-publish -- <slug>` passes
- [ ] `npm run build` passes
- [ ] `git push origin main` succeeds

## Forbidden

- Publishing without `cover_image` + photo file
- SVG-only covers (verify-publish will FAIL)
- Hotlinking external images (use repo-hosted files only)
