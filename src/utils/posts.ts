import { getCollection } from 'astro:content';

/**
 * Published posts, newest first. Drafts and future-dated posts are excluded from
 * builds so scheduled articles only go live once their pubDate has passed.
 * In dev everything is visible so upcoming posts can be previewed.
 */
export async function getPublishedPosts() {
	const now = new Date();
	return (await getCollection('blog'))
		.filter((post) => import.meta.env.DEV || (post.data.draft !== true && post.data.pubDate <= now))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
