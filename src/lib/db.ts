import BetterSqlite3 from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import type { FeedItem } from './feed';

const DB_VERSION = 1;

export function recreateDb(): BetterSqlite3.Database {
	mkdirSync('./data', { recursive: true });

	const db = BetterSqlite3('data/local.sqlite');

	db.exec(
		`
        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL,
		  title TEXT,
		  description TEXT,
		  content TEXT,
		  author TEXT,
		  publish_date TEXT,
		  added_date TEXT,
		  favicon TEXT
        )
      `
	);

	migrateDb(db);

	return db;
}

export function getArticle(id: string): FeedItem {
	const db = recreateDb();

	return db.prepare(`SELECT * FROM articles WHERE id = ${id}`).get() as FeedItem;
}

export function getArticles(): FeedItem[] {
	const db = recreateDb();

	const articles = db.prepare('SELECT * FROM articles').all() as FeedItem[];

	return articles;
}

export function deleteArticle(id: string): BetterSqlite3.RunResult {
	const db = recreateDb();

	return db.prepare(`DELETE FROM articles WHERE id = ${id}`).run();
}

export function migrateDb(db: BetterSqlite3.Database) {
	const { user_version } = db.prepare('PRAGMA user_version').get() as { user_version: number };

	console.log('checking for database updates');

	if (user_version < DB_VERSION) {
		console.log('migration required!');
		// version 1 - add rename date column to publish_date added_date column
		if (user_version < 1) {
			console.info('migrating to v1...');
			db.exec(`
				ALTER TABLE articles RENAME COLUMN date TO publish_date;
				ALTER TABLE articles ADD COLUMN added_date TEXT;
				UPDATE articles SET added_date = '${new Date().toDateString()}' WHERE added_date IS NULL;
				PRAGMA user_version = 1;
			`);
			console.info('migrated to v1!');
		}
	} else {
		console.info(
			`database already at latest version, ${user_version} (your database version) >= ${DB_VERSION} (latest version)`
		);
	}

	if (user_version < DB_VERSION) {
		console.warn('user_version doesnt match DB_VERSION, there may be a missing migration!');
	}
}
