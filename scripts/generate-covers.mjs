import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'public', 'images', 'covers');
const blogDir = join(process.cwd(), 'src', 'content', 'blog');

const palettes = {
  'sunscreen-spf': { a: '#f6efe7', b: '#e8cfc0', c: '#c98b7e', accent: '#a66b5f' },
  'skincare-routine': { a: '#f3efe8', b: '#ddd4c8', c: '#9a8b7a', accent: '#6b5f52' },
};

const iconByCluster = {
  'sunscreen-spf': 'sun',
  'skincare-routine': 'steps',
};

const iconBySlug = {
  'body-sunscreen-vs-face-sunscreen': 'bottle',
  'spf-for-oily-skin-mattifying-picks': 'matte',
  'mineral-vs-chemical-sunscreen': 'shield',
  'sunscreen-under-makeup': 'glow',
  'best-fluid-sunscreens-2026': 'drop',
  'how-often-reapply-sunscreen': 'clock',
  'skincare-routine-order': 'order',
};

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^([a-z_]+):\s*"?([^"]+)"?/);
    if (m) data[m[1]] = m[2];
  }
  return data;
}

function iconSvg(type, color) {
  const icons = {
    sun: `<circle cx="600" cy="200" r="72" fill="${color}" opacity="0.35"/><circle cx="600" cy="200" r="42" fill="${color}" opacity="0.55"/>`,
    bottle: `<rect x="560" y="120" width="80" height="160" rx="24" fill="${color}" opacity="0.4"/><rect x="585" y="95" width="30" height="28" rx="8" fill="${color}" opacity="0.55"/>`,
    matte: `<ellipse cx="600" cy="210" rx="95" ry="55" fill="${color}" opacity="0.35"/><path d="M505 210 Q600 150 695 210" stroke="${color}" stroke-width="8" fill="none" opacity="0.5"/>`,
    shield: `<path d="M600 110 L690 150 V220 Q690 290 600 320 Q510 290 510 220 V150 Z" fill="${color}" opacity="0.4"/>`,
    glow: `<circle cx="600" cy="200" r="88" fill="none" stroke="${color}" stroke-width="10" opacity="0.35"/><circle cx="600" cy="200" r="52" fill="${color}" opacity="0.25"/>`,
    drop: `<path d="M600 120 C560 190 540 230 560 260 Q600 310 640 260 Q660 230 640 190 Z" fill="${color}" opacity="0.45"/>`,
    clock: `<circle cx="600" cy="200" r="70" fill="none" stroke="${color}" stroke-width="10" opacity="0.45"/><path d="M600 200 L600 155 M600 200 L635 215" stroke="${color}" stroke-width="8" opacity="0.55"/>`,
    steps: `<rect x="520" y="250" width="50" height="50" rx="8" fill="${color}" opacity="0.35"/><rect x="575" y="210" width="50" height="90" rx="8" fill="${color}" opacity="0.45"/><rect x="630" y="170" width="50" height="130" rx="8" fill="${color}" opacity="0.55"/>`,
    order: `<rect x="530" y="150" width="140" height="18" rx="9" fill="${color}" opacity="0.35"/><rect x="530" y="190" width="120" height="18" rx="9" fill="${color}" opacity="0.45"/><rect x="530" y="230" width="100" height="18" rx="9" fill="${color}" opacity="0.55"/><rect x="530" y="270" width="80" height="18" rx="9" fill="${color}" opacity="0.65"/>`,
  };
  return icons[type] ?? icons.sun;
}

function coverSvg({ slug, cluster, icon }) {
  const p = palettes[cluster] ?? palettes['sunscreen-spf'];
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${slug} cover">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.a}"/>
      <stop offset="55%" stop-color="${p.b}"/>
      <stop offset="100%" stop-color="${p.c}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="150" cy="520" r="180" fill="${p.c}" opacity="0.12"/>
  <circle cx="1050" cy="120" r="140" fill="${p.accent}" opacity="0.1"/>
  ${iconSvg(icon, p.accent)}
  <text x="72" y="520" font-family="Georgia, serif" font-size="28" fill="${p.accent}" opacity="0.7">North Lane Pick</text>
</svg>`;
}

await mkdir(outDir, { recursive: true });
const files = (await readdir(blogDir)).filter((f) => f.endsWith('.md'));

for (const file of files) {
  const slug = file.replace(/\.md$/, '');
  const raw = await readFile(join(blogDir, file), 'utf8');
  const fm = parseFrontmatter(raw);
  const cluster = fm.cluster ?? 'sunscreen-spf';
  const icon = iconBySlug[slug] ?? iconByCluster[cluster] ?? 'sun';
  const path = join(outDir, `${slug}.svg`);
  await writeFile(path, coverSvg({ slug, cluster, icon }), 'utf8');
  console.log('wrote', path);
}
