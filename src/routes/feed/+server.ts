import { generateFeed, getLinks } from '$lib/rss';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	return new Response(generateFeed(getLinks()), {
		headers: {
			'Content-Type': 'application/rss+xml'
		},
		status: 200,
		statusText: 'link added successfully'
	});
};
