import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('articles').addColumn('ttr', 'integer').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.alterTable('articles').dropColumn('ttr').execute();
}
