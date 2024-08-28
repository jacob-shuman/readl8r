import { recreateDb } from '$lib/rss';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const db = recreateDb();

	db.prepare(
		`
        CREATE TABLE IF NOT EXISTS links (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL
        )
      `
	).run();

	const links = db.prepare('SELECT * FROM links').all();

	return new Response(JSON.stringify(links), {
		headers: {
			'Content-Type': 'application/json'
		},
		status: 200,
		statusText: 'link added successfully'
	});
};
