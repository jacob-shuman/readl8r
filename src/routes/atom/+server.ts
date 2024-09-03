import { generateFeed, getArticles } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getArticles()).atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml'
		},
		status: 200
	});
};
