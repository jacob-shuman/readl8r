import { FEED_TITLE } from '$env/dynamic/private';
import { generateFeedTitle, getArticles } from '$lib/feed';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	title: FEED_TITLE ?? generateFeedTitle(),
	articles: getArticles()
});
