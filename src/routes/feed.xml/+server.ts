import { generateFeed, getLinks } from '$lib/rss';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getLinks()), {
		status: 200,
		statusText: 'link added successfully'
	});
};
