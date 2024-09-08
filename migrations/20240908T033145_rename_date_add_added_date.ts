import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('articles').renameColumn('date', 'publish_date').execute();
	await db.schema.alterTable('articles').addColumn('added_date', 'text').execute();
	await db
		.updateTable('articles')
		.set({ added_date: new Date().toDateString() })
		.where('added_date', 'is', null)
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('articles').dropColumn('added_date').execute();
	await db.schema.alterTable('articles').renameColumn('publish_date', 'date').execute();
}
