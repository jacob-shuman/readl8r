import { getArticles } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
	new Response(JSON.stringify(getArticles()), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
