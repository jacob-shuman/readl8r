import { isAuthorized } from '$lib/auth';
import { deleteArticle } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ request, params, cookies }) => {
	const { articleId } = params;

	if (!isAuthorized({ request, cookies })) {
		return new Response(undefined, { status: 401, statusText: 'not authorized' });
	}

	const [{ numDeletedRows }] = await deleteArticle(Number(articleId));

	if (numDeletedRows < 1) {
		return new Response(undefined, {
			status: 404,
			statusText: `there is no article with id of ${articleId}`
		});
	}

	return new Response(undefined, {
		status: 200,
		statusText: `article ${articleId} deleted successfully`
	});
};
