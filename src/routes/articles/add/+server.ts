import { isAuthorized } from '$lib/auth';
import { addArticle } from '$lib/db';
import { extract } from '@extractus/article-extractor';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { url } = await request.json();

	if (!isAuthorized({ request, cookies })) {
		return new Response(undefined, { status: 401, statusText: 'Missing bearer token' });
	} else if (!url) {
		return new Response(undefined, { status: 400, statusText: 'url is required' });
	}

	const article = await extract(url);

	if (article) {
		await addArticle({
			url,
			title: article.title,
			description: article.description?.slice(0, 200) ?? article.content?.slice(0, 200) + '...',
			content: article.content,
			author: article.author,
			publish_date: article.published || new Date().toISOString(),
			added_date: new Date().toISOString(),
			favicon: article.favicon,
			ttr: article.ttr
		});

		return new Response(undefined, {
			status: 200,
			statusText: 'article added successfully'
		});
	}

	return new Response(undefined, {
		status: 400,
		statusText: `Unable to extract metadata at "${url}"`
	});
};
