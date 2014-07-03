# Smart Crawler

## What is this

This module is propose to scrapy website pages and extract information from doms which selected by jQuery-like selectors

## Features

- Batch page scrapy support
- jQuery-like selector supported for extracting dom infomation 
- Promises/A style support

## How to use

- Scrapy website: `new Crawler([domain1, domain2], callback)`

```
var Crawler = require("crawler");
var domain = "http://example.com";

new Crawler(domain, function (err, result, mergedResult) {
	var $body = result[domain];
	console.log($body.html());
});
```
- Using selector: `new Crawler([domain1, domain2], queryString, callback)`

*Note: not all jQuery query style is supported, details on [cheerio](https://github.com/cheeriojs/cheerio)*

```
var Crawler = require("crawler");
var domain = "http://example.com";

new Crawler(domain, "p", function (err, result, mergedResult) {

	if (err) return;

	var paragraphs = result[domain];
	paragraphs.forEach(function ($p) {
		console.log($p.text());
	});
});
```

- Custom request options: `new Crawler([domain1, domain2], requestOptions,queryString, callback)`

```
var Crawler = require("crawler");
var domain = "http://example.com";

new Crawler(domain, {
	'timeout': 2000,
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
} "p", function (err, result, mergedResult) {

	if (err) return;
});
```
*Request Options available on [Request: Custom HTTP Headers](https://github.com/mikeal/request#custom-http-headers)*


More examples please visit: [examples](https://github.com/hh54188/Smart-Crawler/tree/master/examples)

## External API

- `.refetch()`: to refetch the same sites with same parameters;
