import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const other = defineCollection({
	// Standalone pages at the root of `src/content/` only. Must NOT recurse into
	// `blog/`, or the catch-all `[...slug]` route republishes every post — drafts
	// and future-dated ones included — outside the blog route's filtering.
	loader: glob({ base: './src/content', pattern: '*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string()
		}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			draft: z.boolean().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { blog, other };
