#!/usr/bin/env node
/**
 * Pre-push gate for cloud automation. Exits 1 with a clear error if publish is incomplete.
 * Usage: node scripts/verify-publish.mjs <slug>
 */
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('FAIL: missing slug. Usage: npm run verify-publish -- <slug>');
  process.exit(1);
}

const root = process.cwd();
const articlePath = join(root, 'src', 'content', 'blog', `${slug}.md`);
const progressPath = join(root, '_progress.yaml');

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

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

const errors = [];

if (!(await exists(articlePath))) {
  errors.push(`article missing: src/content/blog/${slug}.md`);
} else {
  const raw = await readFile(articlePath, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm.cover_image) {
    errors.push(`frontmatter missing cover_image (required: "/images/covers/${slug}.jpg")`);
  } else if (!fm.cover_image.startsWith('/images/covers/')) {
    errors.push(`cover_image must be under /images/covers/ (got: ${fm.cover_image})`);
  } else {
    const coverRel = fm.cover_image.replace(/^\//, '');
    const coverPath = join(root, 'public', coverRel);
    if (!(await exists(coverPath))) {
      errors.push(`cover file missing: public/${coverRel}`);
    } else if (coverPath.endsWith('.svg')) {
      errors.push('cover must be .jpg or .webp photo, not .svg alone');
    }
  }
  if (fm.affiliate_tag !== 'northlanepick-20') {
    errors.push('affiliate_tag must be northlanepick-20');
  }
}

if (!(await exists(progressPath))) {
  errors.push('_progress.yaml missing');
} else {
  const progress = await readFile(progressPath, 'utf8');
  if (!progress.includes(`slug: ${slug}`)) {
    errors.push(`_progress.yaml published list missing slug: ${slug}`);
  }
}

if (errors.length) {
  console.error(`FAIL verify-publish (${slug}):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`OK verify-publish: ${slug} · cover ready · progress updated`);
