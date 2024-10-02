import { isAuthorized } from '$lib/auth';
import { deleteAllArticles } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	if (!(await isAuthorized({ request, cookies }))) {
		return new Response(undefined, { status: 401, statusText: 'not authorized' });
	}

	const [{ numDeletedRows }] = await deleteAllArticles();

	return new Response(undefined, {
		status: 200,
		statusText: `${numDeletedRows} articles cleared successfully`
	});
};
