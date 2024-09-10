import { type Generated, type Insertable, type Selectable, type Updateable } from 'kysely';

export interface ArticleTable {
	id: Generated<number>;
	url: string;
	publish_date: string; // date article was published (added_date if this can't be found)
	added_date: string; // date the article was added to readl8r
	title: string | null;
	description: string | null;
	content: string | null;
	author: string | null;
	favicon: string | null;
	ttr: number | null; // estimated time to read article in seconds
}

export type Article = Selectable<ArticleTable>;
export type NewArticle = Insertable<ArticleTable>;
export type ArticleUpdate = Updateable<ArticleTable>;

export interface Database {
	articles: ArticleTable;
}
