import { type Generated, type Insertable, type Selectable, type Updateable } from 'kysely';

export interface ArticleTable {
	id: Generated<number>;
	url: string;
	publish_date: string;
	added_date: string;
	title: string | null;
	description: string | null;
	content: string | null;
	author: string | null;
	favicon: string | null;
}

export type Article = Selectable<ArticleTable>;
export type NewArticle = Insertable<ArticleTable>;
export type ArticleUpdate = Updateable<ArticleTable>;

export interface Database {
	articles: ArticleTable;
}
