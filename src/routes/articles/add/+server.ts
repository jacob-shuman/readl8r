import { recreateDb } from '$lib/feed';
import { extract } from '@extractus/article-extractor';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { url } = await request.json();

	if (!url) {
		return new Response(undefined, { status: 400, statusText: 'url is required' });
	}

	const db = recreateDb();

	const article = await extract(url);

	if (article) {
		const { lastInsertRowid } = db
			.prepare(
				'INSERT INTO articles (url, title, description, content, author, date) VALUES (@url, @title, @description, @content, @author, @date)'
			)
			.run({
				url,
				title: article.title,
				description: article.description ?? article.content?.slice(0, 200) + '...',
				content: article.content,
				author: article.author,
				date: article.published ?? new Date().toDateString()
			});

		return new Response(JSON.stringify({ id: lastInsertRowid, url }), {
			status: 200,
			statusText: 'article added successfully'
		});
	}

	return new Response(undefined, {
		status: 400,
		statusText: `Unable to extract metadata at "${url}"`
	});
};
