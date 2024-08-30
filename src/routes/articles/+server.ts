import { recreateDb } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const db = recreateDb();
	const articles = db.prepare('SELECT * FROM articles').all();

	return new Response(JSON.stringify(articles), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
};
