import { env } from '$env/dynamic/private';
import { type ArticleData } from '@extractus/article-extractor';
import BetterSqlite3 from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import RSS from 'rss';

export interface FeedItem {
	id: number;
	url: string;
	title: ArticleData['title'];
	description: ArticleData['description'];
	content: ArticleData['content'];
	author: ArticleData['author'];
	date: ArticleData['published'];
}

const baseUrl = `${env.SECURE ? 'https' : 'http'}://${env.HOST}:${env.PORT}`;

export function recreateDb(): BetterSqlite3.Database {
	mkdirSync('./data', { recursive: true });

	const db = BetterSqlite3('data/local.sqlite');

	db.prepare(
		`
        CREATE TABLE IF NOT EXISTS links (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          url TEXT NOT NULL,
		  title TEXT,
		  description TEXT,
		  content TEXT,
		  author TEXT,
		  date TEXT
        )
      `
	).run();

	return db;
}

export function generateFeed(items: FeedItem[]) {
	const feed = new RSS({
		title: env.FEED_TITLE ?? 'readl8r RSS Feed',
		description: env.FEED_DESCRIPTION,
		feed_url: `${baseUrl}/rss`,
		site_url: `${baseUrl}`,
		pubDate: new Date(),
		language: env.LANGUAGE ?? 'en'
		// 	image_url: 'http://example.com/icon.png',
		// 	docs: 'http://example.com/rss/docs.html',
		// 	managingEditor: 'Dylan Greene',
		// 	webMaster: 'Dylan Greene',
		// 	copyright: '2013 Dylan Greene',
		// 	categories: ['Category 1', 'Category 2', 'Category 3'],
		// 	ttl: 60,
		// 	custom_namespaces: {
		// 		itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd'
		// 	},
		// 	custom_elements: [
		// 		{ 'itunes:subtitle': 'A show about everything' },
		// 		{ 'itunes:author': 'John Doe' },
		// 		{
		// 			'itunes:summary':
		// 				'All About Everything is a show about everything. Each week we dive into any subject known to man and talk about it as much as we can. Look for our podcast in the Podcasts app or in the iTunes Store'
		// 		},
		// 		{ 'itunes:owner': [{ 'itunes:name': 'John Doe' }, { 'itunes:email': 'john.doe@example.com' }] },
		// 		{
		// 			'itunes:image': {
		// 				_attr: {
		// 					href: 'http://example.com/podcasts/everything/AllAboutEverything.jpg'
		// 				}
		// 			}
		// 		},
		// 		{
		// 			'itunes:category': [
		// 				{
		// 					_attr: {
		// 						text: 'Technology'
		// 					}
		// 				},
		// 				{
		// 					'itunes:category': {
		// 						_attr: {
		// 							text: 'Gadgets'
		// 						}
		// 					}
		// 				}
		// 			]
		// 		}
		// 	]
		// });

		// /* loop over data and add to feed */
		// feed.item({
		// 	title: 'item title',
		// 	description: 'use this for the content. It can include html.',
		// 	url: 'http://example.com/article4?this&that', // link to the item
		// 	guid: '1123', // optional - defaults to url
		// 	categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // optional - array of item categories
		// 	author: 'Guest Author', // optional - defaults to feed author property
		// 	date: 'May 27, 2012', // any format that js Date can parse.
		// 	lat: 33.417974, //optional latitude field for GeoRSS
		// 	long: -111.933231, //optional longitude field for GeoRSS
		// 	enclosure: { url: '...', file: 'path-to-file' }, // optional enclosure
		// 	custom_elements: [
		// 		{ 'itunes:author': 'John Doe' },
		// 		{ 'itunes:subtitle': 'A short primer on table spices' },
		// 		{
		// 			'itunes:image': {
		// 				_attr: {
		// 					href: 'http://example.com/podcasts/everything/AllAboutEverything/Episode1.jpg'
		// 				}
		// 			}
		// 		},
		// 		{ 'itunes:duration': '7:04' }
		// 	]
	});

	for (let item of items) {
		feed.item({
			title: item.title ?? 'No title',
			description: item.description ?? 'No description',
			url: item.url,
			date: item.date ?? new Date(),
			custom_elements: item.content ? [{ 'content:encoded': item.content }] : undefined
		});
	}

	return feed.xml({ indent: true });
}

export function getLinks(): FeedItem[] {
	const db = recreateDb();

	const links = db.prepare('SELECT * FROM links').all() as unknown as FeedItem[];

	return links;
}
