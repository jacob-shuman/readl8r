import { getArticle } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { articleId } = params;

	const article = getArticle(Number(articleId));

	if (!article) {
		return new Response(undefined, {
			status: 404,
			statusText: `there is no article with id of ${articleId}`
		});
	}

	return new Response(JSON.stringify(article), {
		headers: { 'Content-Type': 'application/json' },
		status: 200
	});
};
