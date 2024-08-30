# readl8r

> A _**R**eally **S**imple_ FOSS read later _**S**ervice_ that serves an [RSS](https://www.rssboard.org/rss-specification) feed of all your articles.

## TL;DR

- [Retrieve a `JSON` list of articles](#get-a-list-of-articles) by making a `GET` request to `/articles`.
- [Add an article](#post-an-article) by making a `POST` request (with `url` in a `JSON` body) to `/articles/add`.
- All articles are stored in a `/data/local.sqlite` SQLite database.
- [Atom](https://validator.w3.org/feed/docs/atom.html) and [JSON Feed](https://www.jsonfeed.org/) formats are also available at `/atom` and `/json` respectively.

## GET a list of articles

You can get a `JSON` list of articles by making a `GET` request to the `/articles` route:

`GET (http|https)://YOUR_URL/articles`

## POST an article

You can add an article by providing the article's url in the body of a `POST` request:

`POST (http|https)://YOUR_URL/articles/add`

### body

```json
{
	// required
	"url": "ARTICLE_URL",

	// optional
	"title": "WTF is a GitHub Profile README.md",
	"description": "",
	"author": "Jacob Shuman",
	"content": "",
	"date": ""
}
```

### Possible Responses

#### 200 - "article added successfully"

Article was added to the SQLite database successfully.

#### 400 - "url is required"

The url was not found in the body of the request.

#### Unable to extract metadata at url (400)

There was an issue extracting the article metadata automatically. The article was **not** added to the SQLite database.
