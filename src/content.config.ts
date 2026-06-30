import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cluster: z.string().optional(),
    status: z.string().optional(),
    created: z.string().optional(),
    affiliate_tag: z.string().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = { blog };
