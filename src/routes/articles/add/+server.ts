import { isAuthorized } from '$lib/auth';
import { addArticle } from '$lib/db';
import { extract } from '@extractus/article-extractor';
import { text, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!request.body) {
		return text('url is required', { status: 400, headers: { 'Content-Type': 'text/plain' } });
	}

	const { url } = await request.json();

	if (!(await isAuthorized({ request, cookies }))) {
		return text('not authorized', { status: 401, headers: { 'Content-Type': 'text/plain' } });
	} else if (!request.body || !url) {
		return text('url is required', { status: 400, headers: { 'Content-Type': 'text/plain' } });
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

		return text('article added successfully', {
			status: 200,
			headers: { 'Content-Type': 'text/plain' }
		});
	}

	return text(`unable to extract metadata at "${url}"`, {
		status: 400,
		headers: { 'Content-Type': 'text/plain' }
	});
};
