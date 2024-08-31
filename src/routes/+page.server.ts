import { env } from '$env/dynamic/private';
import { generateFeedTitle, getArticles } from '$lib/feed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	title: env.FEED_TITLE ?? generateFeedTitle(),
	articles: getArticles()
});
