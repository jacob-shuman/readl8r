import { env } from '$env/dynamic/private';
import { type ArticleData } from '@extractus/article-extractor';
import { Feed } from 'feed';

export interface FeedItem {
	id: number;
	url: string;
	publish_date: string;
	added_date: string;
	title: ArticleData['title'];
	description: ArticleData['description'];
	content: ArticleData['content'];
	author: ArticleData['author'];
	favicon: ArticleData['favicon'];
}

const baseUrl = `${env.SECURE ? 'https' : 'http'}://${env.HOST}:${env.PORT}`;

export function generateFeed(items: FeedItem[]): Feed {
	const feed = new Feed({
		title: env.FEED_TITLE ?? 'readl8r',
		description: env.FEED_DESCRIPTION,
		id: baseUrl,
		link: baseUrl,
		language: 'en',
		image: env.FEED_IMAGE ? `${baseUrl}/${env.FEED_IMAGE}` : undefined,
		favicon: env.FEED_FAVICON ? `${baseUrl}/${env.FEED_FAVICON}` : undefined,
		copyright: env.FEED_COPYRIGHT ?? 'No copyright notice',
		updated: new Date(),
		generator: 'readl8r',
		feedLinks: {
			json: `${baseUrl}/json`,
			atom: `${baseUrl}/atom`,
			rss: `${baseUrl}/rss`
		},
		author: {
			name: env.AUTHOR_NAME,
			email: env.AUTHOR_EMAIL,
			link: env.AUTHOR_LINK
		},
		hub: `${baseUrl}/hub`
	});

	for (let item of items) {
		feed.addItem({
			title: item.title ?? 'No title',
			description: item.description ?? 'No description',
			link: item.url,
			date: new Date(item.publish_date),
			content: item.content
		});
	}

	return feed;
}

const adjectives: string[] = [
	// goofy
	'Witty',
	'Quirky',
	'Silly',
	'Goofy',
	'Zany',
	'Whimsical',
	'Laughable',
	'Chuckling',
	'Nonsense',
	'Absurd'
];
const nouns: string[] = [
	// formal
	'Daily',
	'Weekly',
	'Monthly',
	'York',
	'City',
	'Urban',
	'Coastal',
	'National',
	'Global',
	'Central',

	// goofy
	'Pickle',
	'Banana',
	'Squirrel',
	'Tater Tot',
	'Llama',
	'Chicken',
	'Potato',
	'Unicorn',
	'Jellybean'
];
const publications: string[] = [
	'Press',
	'Bulletin',
	'Gazette',
	'Times',
	'Ledger',
	'Chirp',
	'Report',
	'Update',
	'Journal',
	'Herald',
	'Tribune',
	'Chronicles',
	'Observer',
	'Review',
	'Express',
	'Post'
];

export function generateFeedTitle(): string {
	const adjective =
		Math.random() < 0.5 ? `${adjectives[Math.floor(Math.random() * adjectives.length)]} ` : '';
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	const publication = publications[Math.floor(Math.random() * publications.length)];

	return `The ${adjective}${noun} ${publication}`;
}

export function generateFeedDescription(): string {
	const descriptions = [
		'Making Headlines Less Boring',
		'Headlines, Now with Flavor.',
		'Bringing Headlines to Life.',
		'Now 50% Less Boring!',
		'Your Daily Briefing, Lightly Toasted.',
		"The World's Events, Served with a Wink.",
		'The Daily Scoop with Extra Sass.'
	];

	return descriptions[Math.floor(Math.random() * descriptions.length)];
}
