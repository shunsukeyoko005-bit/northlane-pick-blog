# Blog images — required on every publish

> **Owner rule (2026-07-02):** Every article must ship with a cover image. No image-less publishes.

## Default (Automation · every run)

After writing `src/content/blog/<slug>.md`:

```bash
npm run covers
```

- Output: `public/images/covers/<slug>.svg`
- Site auto-uses `/images/covers/<slug>.svg` when `cover_image` is omitted
- **Commit the SVG** with the article in the same push

## Upgrade path — real photos (Phase 3)

When a matching Pinterest pin exists for the topic:

1. Copy image to `public/images/covers/<slug>.jpg` (or `.webp`)
2. Set frontmatter: `cover_image: "/images/covers/<slug>.jpg"`
3. Commit image + article together

Pinterest assets live under `dropship-ai/content/pinterest/` (秘書がトピック一致を探して流用).

## Verification before push

- [ ] `public/images/covers/<slug>.svg` or custom `cover_image` exists
- [ ] `npm run build` passes
- [ ] Card + article hero show the image locally (`npm run preview`)

## Forbidden

- Publishing an article without any cover asset in `public/images/covers/`
- Hotlinking external images (use repo-hosted files only)
