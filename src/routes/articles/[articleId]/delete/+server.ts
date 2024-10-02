import { isAuthorized } from '$lib/auth';
import { deleteArticle } from '$lib/db';
import { text, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, params, cookies }) => {
	const { articleId } = params;

	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	}

	const [{ numDeletedRows }] = await deleteArticle(Number(articleId));

	if (numDeletedRows < 1) {
		return text(`there is no article with id of ${articleId}`, {
			status: 404,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	return text(`article ${articleId} deleted successfully`, {
		status: 200,
		headers: { 'Content-Type': 'text/plain' }
	});
};
