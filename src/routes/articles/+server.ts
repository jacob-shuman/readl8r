import { isAuthorized } from '$lib/auth';
import { getArticles } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies }) => {
	if (!(await isAuthorized({ request, cookies }))) {
		return new Response(undefined, { status: 401, statusText: 'not authorized' });
	}

	return new Response(JSON.stringify(await getArticles()), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
};
