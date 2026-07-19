import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Update `site` to your real domain after you connect it in Cloudflare Pages.
export default defineConfig({
  site: 'https://northlanepick.com',
  integrations: [sitemap()],
});
