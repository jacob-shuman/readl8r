import { isAuthorized } from '$lib/auth';
import { recreateDb } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	if (!isAuthorized(request)) {
		return new Response(undefined, { status: 401, statusText: 'Missing bearer token' });
	}

	recreateDb().exec('DROP TABLE articles');
	recreateDb();

	return new Response(undefined, {
		status: 200,
		statusText: 'articles cleared successfully'
	});
};
