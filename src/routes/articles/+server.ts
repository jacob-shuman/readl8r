import { getArticles } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () =>
	new Response(JSON.stringify(await getArticles()), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
