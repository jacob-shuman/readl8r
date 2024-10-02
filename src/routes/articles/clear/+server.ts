import { isAuthorized } from '$lib/auth';
import { deleteAllArticles } from '$lib/db';
import { text, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, cookies }) => {
	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	}

	const [{ numDeletedRows }] = await deleteAllArticles();

	return text(`${numDeletedRows} articles cleared successfully`, {
		status: 200,
		headers: { 'Content-Type': 'text/plain' }
	});
};
