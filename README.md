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

### Possible Responses

#### 200 -

## POST an article

You can add an article by providing the article's url in the body of a `POST` request:

`POST (http|https)://YOUR_URL/articles/add`

### body

```json
{
	// required
	"url": "https://dev.to/jacobshuman/wtf-is-a-github-profile-readmemd-1p8c",

	// optional
	"title": "WTF is a GitHub Profile README.md",
	"description": "What is a profile README and why would I want one?",
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

#### 400 - Unable to extract metadata at url

There was an issue extracting the article metadata automatically. The article was **not** added to the SQLite database.

## Endpoints

### /rss (GET)

Content-Type - application/xml+rss

aliases

- /rss.xml
- /feed
- /feed.xml

#### Possible Responses

##### 200

##### 400

### /atom (GET

### /json (GET)

### /articles (GET)

Returns a JSON array of all articles in your reading list. Objects are FeedItems.

### /articles/add (POST)
