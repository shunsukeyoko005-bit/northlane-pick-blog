import type { CollectionEntry } from 'astro:content';

export function clusterOf(post: CollectionEntry<'blog'>): string {
  if (post.data.cluster) return post.data.cluster;
  const id = post.id.toLowerCase();
  if (id.includes('sunscreen') || id.includes('spf')) return 'sunscreen-spf';
  return 'skincare-routine';
}

export function pickRelated(
  all: CollectionEntry<'blog'>[],
  current: CollectionEntry<'blog'>,
  limit = 3
): CollectionEntry<'blog'>[] {
  const cluster = clusterOf(current);
  const others = all
    .filter((post) => post.id !== current.id)
    .sort((a, b) => (b.data.created ?? '').localeCompare(a.data.created ?? ''));
  const same = others.filter((post) => clusterOf(post) === cluster);
  const rest = others.filter((post) => clusterOf(post) !== cluster);
  return [...same, ...rest].slice(0, limit);
}
