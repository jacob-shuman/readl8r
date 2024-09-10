import { updateArticle } from '$lib/db';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, params }) => {
	const { articleId } = params;
	const { article } = await request.json();

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
