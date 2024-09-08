import { Kysely } from 'kysely';

export async function up(db: Kysely<any>) {
	const articles = await db
		.selectFrom('articles')
		.select(['id', 'added_date', 'publish_date'])
		.execute();

	const updatedArticles = articles.map((article) => ({
		id: article.id,
		added_date: new Date(article.added_date).toISOString(),
		publish_date: new Date(article.publish_date).toISOString()
	}));

	await db.transaction().execute(async (trx) => {
		for (const { id, added_date, publish_date } of updatedArticles) {
			await trx
				.updateTable('articles')
				.set({
					added_date,
					publish_date
				})
				.where('id', '=', id)
				.execute();
		}
	});
}

export async function down(db: Kysely<any>) {
	const articles = await db
		.selectFrom('articles')
		.select(['id', 'added_date', 'publish_date'])
		.execute();

	const updatedArticles = articles.map((article) => ({
		id: article.id,
		added_date: new Date(article.added_date).toDateString(),
		publish_date: new Date(article.publish_date).toDateString()
	}));

	await db.transaction().execute(async (t) => {
		for (const { id, added_date, publish_date } of updatedArticles) {
			await t
				.updateTable('articles')
				.set({
					added_date,
					publish_date
				})
				.where('id', '=', id)
				.execute();
		}
	});
}
