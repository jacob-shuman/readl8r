import { isAuthorized } from '$lib/auth';
import { recreateDb } from '$lib/feed';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	if (!isAuthorized(request)) {
		return new Response(undefined, { status: 401, statusText: 'Missing bearer token' });
	}

	recreateDb().prepare('DROP TABLE articles').run();
	recreateDb();

	return new Response(undefined, {
		status: 200,
		statusText: 'articles cleared successfully'
	});
};
