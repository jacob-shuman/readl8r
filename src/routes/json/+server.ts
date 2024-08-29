import { generateFeed, getLinks } from '$lib/rss';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getLinks()).json1(), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200,
		statusText: 'link added successfully'
	});
};
