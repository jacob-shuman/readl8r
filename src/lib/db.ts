import BetterSqlite3 from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import type { FeedItem } from './feed';

export function recreateDb(): BetterSqlite3.Database {
	mkdirSync('./data', { recursive: true });

	const db = BetterSqlite3('data/local.sqlite');

	return db.exec(
		`
        CREATE TABLE IF NOT EXISTS articles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL,
		  title TEXT,
		  description TEXT,
		  content TEXT,
		  author TEXT,
		  date TEXT,
		  favicon TEXT
        )
      `
	);
}

export function getArticles(): FeedItem[] {
	const db = recreateDb();

	const articles = db.prepare('SELECT * FROM articles').all() as FeedItem[];

	return articles;
}
