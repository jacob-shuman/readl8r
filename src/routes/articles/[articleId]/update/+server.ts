import { isAuthorized } from '$lib/auth';
import { updateArticle } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, params, cookies }) => {
	const { articleId } = params;
	const { article } = await request.json();

	if (!isAuthorized({ request, cookies })) {
		return new Response(undefined, { status: 401, statusText: 'not authorized' });
	}

	const updatedArticle = updateArticle(Number(articleId), article);

	if (!updatedArticle) {
		return new Response(undefined, {
			status: 404,
			statusText: `there is no article with id of ${articleId}`
		});
	}

	return new Response(JSON.stringify(updatedArticle), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200
	});
};
