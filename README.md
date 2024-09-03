<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./static/favicon-light.svg" />
	<img alt="logo" src="./static/favicon-dark.svg" width="128px" />
</picture>

# readl8r

> A _**R**eally **S**imple_ FOSS read later _**S**ervice_ that serves an [RSS](https://www.rssboard.org/rss-specification) feed of all your articles.

## :star: Features

- :heavy_plus_sign: [Add an article](#add-an-article) by making a `POST` request (with `url` in a `JSON` body) to `/articles/add`.
- :clipboard: [Get a `JSON` array of articles](#get-a-json-array-of-articles) by making a `GET` request to `/articles`.
- :no_entry_sign: [Remove all articles](#remove-all-articles) by making a `POST` request to `/articles/clear`.
- :file_cabinet: All articles are stored in a `/data/local.sqlite` SQLite database.
- :inbox_tray: Get an [RSS](https://www.rssboard.org/rss-specification), [Atom](https://validator.w3.org/feed/docs/atom.html), or [JSON](https://www.jsonfeed.org/) feed of articles at [`/rss`](#generate-rss2-feed-from-articles), [`/atom`](#generate-atom-feed-from-articles), or [`/json`](#generate-json-feed-from-articles) respectively.

<picture>
	<source media="(prefers-color-scheme: dark)" srcset="./screenshots/home-dark.jpeg" />
	<img alt="home page screenshot" src="./screenshots/home-light.jpeg"  />
</picture>

## :lock: Authentication

You can **optionally** protect your reading list with a password by setting a `PASSWORD` env variable in your compose config. This will protect all routes (except for feeds ie `/rss`, `/atom`, etc. **working on a better solution to this**).

## :heavy_plus_sign: Add an article

**Requires Authentication**

You can add an article by providing the article's url in the body of a `POST` request:

`POST (http|https)://HOST:PORT/articles/add`

### body

```jsonc
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

### Responses

| Status | StatusText                               | Body        | Content-Type       |
| ------ | ---------------------------------------- | ----------- | ------------------ |
| 200    | `article added successfully`             | `undefined` | `application/json` |
| 400    | `url is required`                        | `undefined` | `undefined`        |
| 400    | `Unable to extract metadata at "${url}"` | `undefined` | `undefined`        |

## :clipboard: Get a `JSON` array of articles

**Requires Authentication**

You can get a `JSON` array of articles by making a `GET` request to the `/articles` route:

`GET (http|https)://HOST:PORT/articles`

### Responses

| Status | StatusText  | Body         | Content-Type       |
| ------ | ----------- | ------------ | ------------------ |
| 200    | `undefined` | `FeedItem[]` | `application/json` |

## :no_entry_sign: Remove all articles

**Requires Authentication**

`Content-Type: application/xml+rss`

`POST (http|https)://HOST:PORT/articles/clear`

### Responses

| Status | StatusText                      | Body        | Content-Type |
| ------ | ------------------------------- | ----------- | ------------ |
| 200    | `articles cleared successfully` | `undefined` | `undefined`  |

## :inbox_tray: Generate RSS2 feed from articles

`GET (http|https)://HOST:PORT/rss`

`GET (http|https)://HOST:PORT/rss.xml`

`GET (http|https)://HOST:PORT/feed`

`GET (http|https)://HOST:PORT/feed.xml`

### Responses

| Status | StatusText  | Body     | Content-Type          |
| ------ | ----------- | -------- | --------------------- |
| 200    | `undefined` | RSS Feed | `application/rss+xml` |

## :inbox_tray: Generate Atom feed from articles

`GET (http|https)://HOST:PORT/atom`

### Responses

| Status | StatusText  | Body      | Content-Type           |
| ------ | ----------- | --------- | ---------------------- |
| 200    | `undefined` | Atom Feed | `application/atom+xml` |

## :inbox_tray: Generate JSON feed from articles

`GET (http|https)://HOST:PORT/json`

### Responses

| Status | StatusText  | Body      | Content-Type       |
| ------ | ----------- | --------- | ------------------ |
| 200    | `undefined` | JSON Feed | `application/json` |
