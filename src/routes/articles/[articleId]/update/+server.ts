import { isAuthorized } from '$lib/auth';
import { updateArticle } from '$lib/db';
import { json, text, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, params, cookies }) => {
	const { articleId } = params;
	const { article } = await request.json();

	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	}

	const updatedArticle = await updateArticle(Number(articleId), article);

	if (!updatedArticle) {
		return text(`there is no article with id of ${articleId}`, {
			status: 404,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	return json(updatedArticle, { status: 200 });
};
