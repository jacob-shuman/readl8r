import BetterSqlite3 from 'better-sqlite3';
import {
	DeleteResult,
	InsertResult,
	Kysely,
	Migrator,
	SqliteDialect,
	type Migration
} from 'kysely';
import { mkdirSync } from 'node:fs';
import type { Article, ArticleUpdate, Database, NewArticle } from './types';
import { logger } from './utils';

export async function getDb(): Promise<Kysely<Database>> {
	mkdirSync('./data', { recursive: true });

	const db = new Kysely<Database>({
		dialect: new SqliteDialect({
			database: new BetterSqlite3('data/local.sqlite')
		})
	});
	const migrator = new Migrator({
		db,
		provider: {
			getMigrations: async () =>
				import.meta.glob('../../migrations/**.ts', {
					eager: true
				}) as Record<string, Migration>
		}
	});

	db.schema
		.createTable('articles')
		.ifNotExists()
		.addColumn('id', 'integer', (col) => col.primaryKey().autoIncrement())
		.addColumn('url', 'text', (col) => col.notNull())
		.addColumn('title', 'text')
		.addColumn('description', 'text')
		.addColumn('content', 'text')
		.addColumn('author', 'text')
		.addColumn('date', 'text')
		.addColumn('favicon', 'text')
		.execute();

	const { error, results } = await migrator.migrateToLatest();

	for (const res of results ?? []) {
		if (res.status === 'Success') {
			logger.success(`migration "${res.migrationName}" was executed successfully`);
		} else if (res.status === 'Error') {
			logger.error(`failed to execute migration "${res.migrationName}"`);
		}
	}

	if (error) {
		logger.error('failed to migrate');
		logger.error(error);
		process.exit(1);
	}

	return db;
}

export async function addArticle(article: NewArticle): Promise<InsertResult[]> {
	const db = await getDb();

	return await db.insertInto('articles').values(article).execute();
}

export async function getArticle(id: number): Promise<Article | undefined> {
	const db = await getDb();

	return await db.selectFrom('articles').where('id', '=', id).selectAll().executeTakeFirst();
}

export async function getArticles(): Promise<Article[]> {
	const db = await getDb();

	return await db.selectFrom('articles').selectAll().execute();
}

export async function updateArticle(id: number, article: ArticleUpdate): Promise<Article[]> {
	const db = await getDb();

	return await db
		.updateTable('articles')
		.set(article)
		.where('id', '=', id)
		.returningAll()
		.execute();
}

export async function deleteArticle(id: number): Promise<DeleteResult[]> {
	const db = await getDb();

	return await db.deleteFrom('articles').where('id', '=', id).execute();
}

export async function deleteAllArticles(): Promise<DeleteResult[]> {
	const db = await getDb();

	return await db.deleteFrom('articles').execute();
}

export function getPurgeDate(period: 'h' | 'd' | 'm' | 'y', amount: number): Date {
	const date = new Date();

	switch (period) {
		case 'h':
			date.setHours(date.getHours() - amount);
			break;
		case 'd':
			date.setDate(date.getDate() - amount);
			break;
		case 'm':
			date.setMonth(date.getMonth() - amount);
			break;
		case 'y':
			date.setFullYear(date.getFullYear() - amount);
			break;
	}

	return date;
}
export async function purgeArticles(
	period: 'h' | 'd' | 'm' | 'y',
	amount: number
): Promise<DeleteResult[]> {
	const db = await getDb();

	return await db
		.deleteFrom('articles')
		.where('added_date', '<', getPurgeDate(period, amount).toISOString())
		.execute();
}
