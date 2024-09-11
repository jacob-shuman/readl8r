import { isAuthorized } from '$lib/auth';
import { getArticle } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, request, cookies }) => {
	const { articleId } = params;

	if (!isAuthorized({ request, cookies })) {
		return new Response(undefined, { status: 401, statusText: 'not authorized' });
	}

	const article = getArticle(Number(articleId));

	if (!article) {
		return new Response(undefined, {
			status: 404,
			statusText: `there is no article with an id of "${articleId}"`
		});
	}

	return new Response(JSON.stringify(article), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	});
};
