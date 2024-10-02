import { isAuthorized } from '$lib/auth';
import { getArticles } from '$lib/db';
import { json, text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request, cookies }) => {
	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	}

	return json(await getArticles(), { status: 200 });
};
