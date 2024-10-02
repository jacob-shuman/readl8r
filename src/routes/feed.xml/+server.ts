import { getArticles } from '$lib/db';
import { generateFeed } from '$lib/feed';
import { text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
	text(generateFeed(await getArticles()).rss2(), {
		status: 200,
		headers: { 'Content-Type': 'application/rss+xml' }
	});
