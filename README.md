# North Lane Pick — Blog

Static blog (Astro) that complements the North Lane Pick Pinterest account and
amplifies the Amazon Associates US program (`northlanepick-20`).

## Stack

- **Astro 5** (static output)
- Content: Markdown in `src/content/blog/`
- Hosting: **Cloudflare Pages** (free) — project `northlane-pick-blog`
- Domain: `northlanepick.com` (set in `astro.config.mjs`) — **live** since 2026-07-01

## Deploy (Windows · Direct Upload)

After `npm run build`, package `dist/` with **forward slashes** (required):

```powershell
cd dist
tar -a -c -f ..\northlane-pick-blog-deploy.zip *
```

Upload via Cloudflare Dashboard → Workers & Pages → northlane-pick-blog → Create deployment → Production.

Do **not** use `Compress-Archive` — backslash paths break article routes.

## Local commands

```
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # serve the built site
```

## Adding an article (secretary workflow)

1. Create `src/content/blog/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "..."
   description: "..."
   cluster: "sunscreen-spf" | "skincare-routine"
   created: "YYYY-MM-DD"
   ---
   ```
2. Start the body with the affiliate disclosure line:
   `*As an Amazon Associate I earn from qualifying purchases. ...*`
3. Use affiliate links: `https://www.amazon.com/dp/{ASIN}?tag=northlanepick-20`
4. Do **not** state prices manually — say "check current price on Amazon".
5. `git push` → Cloudflare Pages rebuilds and publishes automatically.

## Required pages (kept current)

- `/about`, `/privacy`, `/affiliate-disclosure`

## Affiliate tag

Always `northlanepick-20` (no "s"). Canonical:
`dropship-ai/content/pinterest/setup/affiliate-tag-canonical.md`.
