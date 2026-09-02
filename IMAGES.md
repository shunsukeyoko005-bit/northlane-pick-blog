# Blog images — required on every publish

> **Owner rule (2026-07-02):** Every article must ship with a cover image. No image-less publishes.  
> **Owner ban (2026-09-02 · blog + Pinterest):** **真っ白・デザインなしのボトル／チューブは禁止。**  
> Bad = plain all-white unbranded tube/jar with zero design or color.  
> Good = amber / tinted glass, color on packaging, material depth.  
> **Backgrounds:** previous clean vanity / bathroom looks are fine. Color on the *product* is the requirement, not a totally different set.

## Required (Automation · every RUN)

Every new article **must** have:

1. **Photo file:** `public/images/covers/<slug>.jpg` (or `.webp`) — **1200×630**, beauty/skincare topic, clean editorial style, **no text on image**.
2. **Frontmatter:** `cover_image: "/images/covers/<slug>.jpg"` on the same line as other frontmatter fields (see existing articles).
3. **Verification:** `npm run verify-publish -- <slug>` must exit 0 before `git commit`.

### How to create the JPG (priority order)

| Priority | Method | Notes |
|----------|--------|-------|
| **1. Own photo** | Photograph products you own, bathroom vanity, SPF-in-bag, outdoor scene | Best trust signal · no Amazon copyright issue |
| **2. Licensed stock** | Unsplash / paid stock with commercial license | Lifestyle scenes OK · avoid obvious stock-model clichés when possible |
| **3. Careful AI lifestyle** | Colored packaging / amber glass / outdoor or warm vanity scenes | Must have **color + material depth** · **no** α/edit UI artifacts |
| **❌ Blank white bottles** | All-white unbranded tube/jar still-life with zero design | Owner ban 2026-09-02 · same rule on Pinterest |
| **❌ Amazon listing scrape** | Download Amazon product photos → upload to our server | **Associates Operating Agreement risk** — do not do this |
| **❌ SVG-only** | `npm run covers` alone | `verify-publish` rejects |

### Prompt / composition checklist (AI covers)

**Must include at least one:** amber or tinted glass · colored label band · frosted bottle with visible hue · pump/tube that is not pure white · outdoor/lifestyle prop with color.

**Must never:** `plain white unbranded bottles only` · `matte white tube and white jar` · `no logos, no color, all white packaging` as the whole frame.

### Amazon product images — what is / isn’t allowed

| Allowed | Not allowed |
|---------|-------------|
| Text affiliate links to Amazon | Saving Amazon CDN photos into `public/` |
| Product Advertising API image embeds (after API access) | Hotlinking `m.media-amazon.com` long-term as our “cover” |
| Your own photos of real bottles you bought | Editing/cropping scraped Amazon images |
| Brand assets **with written permission** | Pretending scraped Amazon images are ours |

**Why:** Amazon generally only licenses product images via approved tools (PA-API). Manually downloading listing images and hosting them can risk the Associates account. North Lane Pick currently has **$0 conversions**, so PA-API access is not available yet (typically needs qualifying sales first).

**Practical path until PA-API:** use own photos or lifestyle stock for covers; keep Amazon as **text/button links** in the article body.

After JPG exists:

```bash
npm run covers          # optional SVG fallback
npm run verify-publish -- <slug>
```

## What the site uses

- Article hero + card + OG/Twitter: `cover_image` frontmatter → `public/images/covers/<slug>.jpg`
- If `cover_image` is missing, site falls back to `.svg` (looks empty — **do not rely on this**)
- Repo policy: **no external hotlinks** for covers (`IMAGES.md` / verify scripts)

## Verification before push

- [ ] `cover_image` in frontmatter points to `.jpg` or `.webp`
- [ ] File exists under `public/images/covers/`
- [ ] Image is not a blank unlabeled AI bottle still-life (prefer lifestyle / labeled / own photo)
- [ ] `npm run verify-publish -- <slug>` passes
- [ ] `npm run build` passes
- [ ] `git push origin main` succeeds

## Forbidden

- Publishing without `cover_image` + photo file
- SVG-only covers (verify-publish will FAIL)
- Hotlinking external images as the stored cover
- Downloading Amazon product listing images into the repo
- **Blank all-white design-less bottle / tube still-lifes** (blog covers and Pinterest pins)
