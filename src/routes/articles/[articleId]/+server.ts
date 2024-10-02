import { isAuthorized } from '$lib/auth';
import { getArticle } from '$lib/db';
import { json, text, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request, cookies }) => {
	const { articleId } = params;

	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	}

	const article = await getArticle(Number(articleId));

	if (!article) {
		return text(`there is no article with an id of "${articleId}"`, {
			status: 404,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	return json(article, { status: 200 });
};
