import { env } from '$env/dynamic/private';
import { getArticles } from '$lib/db';
import { generateFeedDescription, generateFeedTitle } from '$lib/feed';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => ({
	title: env.FEED_TITLE ?? generateFeedTitle(),
	description: env.FEED_DESCRIPTION ?? generateFeedDescription(),
	articles: getArticles()
});
