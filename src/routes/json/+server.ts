import { getArticles } from '$lib/db';
import { generateFeed } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getArticles()).json1(), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
};
