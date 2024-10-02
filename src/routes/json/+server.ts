import { getArticles } from '$lib/db';
import { generateFeed } from '$lib/feed';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return json(generateFeed(await getArticles()).json1(), {
		status: 200
	});
};
