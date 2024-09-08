import { getArticles } from '$lib/db';
import { generateFeed } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(await getArticles()).atom1(), {
		headers: {
			'Content-Type': 'application/atom+xml'
		},
		status: 200
	});
};
