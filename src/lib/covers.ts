export function coverForSlug(slug: string, coverImage?: string): string {
  if (coverImage) return coverImage;
  return `/images/covers/${slug}.svg`;
}

export function absoluteUrl(path: string, site: string | URL): string {
  return new URL(path, site).href;
}
