import { generateFeed, getArticles } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getArticles()).rss2(), {
		headers: {
			'Content-Type': 'application/rss+xml'
		},
		status: 200
	});
};
