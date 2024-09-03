import { env } from '$env/dynamic/private';
import { generateFeedDescription, generateFeedTitle, getArticles } from '$lib/feed';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => ({
	title: env.FEED_TITLE ?? generateFeedTitle(),
	description: env.FEED_DESCRIPTION ?? generateFeedDescription(),
	articles: getArticles()
});
