# Smart Crawler

## What is this

This module is propose to scrapy website pages and extract information from doms which selected by jQuery-like selectors

## Features

- Batch page scrapy support
- jQuery-like selector supported for extracting dom infomation
- Promises/A style support
- Custom request optoins support


*Note: not all jQuery query style is supported, details on [cheerio](https://github.com/cheeriojs/cheerio)*

*Note:Request Options available on [Request: Custom HTTP Headers](https://github.com/mikeal/request#custom-http-headers)*

## How to use

### Simple Usage

- Get a web page's source code: `new Crawler(domain1, callback)
`

```
var Crawler = require("../crawler");
var domain = 'http://example.com';

new Crawler(domain, function (err, result) {
    var $ = result[domain];
	  console.log($.html());
});
```

- Get child element's attribute and inner text:

```
var Crawler = require("../crawler");
var domain = 'http://example.com';

new Crawler(domain, function (err, result) {
		var $ = result[domain];
		$('p').text();
		$('a').attr('href');
		console.log($('p').html());
});
```

- Specify DOM selector in options: `new Crawler(domain, selector, callback)`

```
var Crawler = require("../crawler");
var domain = 'http://example.com';

new Crawler(domain, 'p', function (err, result) {
		var paragraphs = result[domain];
		paragraphs.forEach(function ($p) {
				console.log($p.text());
		})
});
```
### Advanced Usage:

- Multiply pages: `new Crawler([domain1, domain2], queryString, callback)`

- Custom request options: `new Crawler([domain1, domain2], requestOptions,queryString, callback)`

```
var Crawler = require("crawler");
var domain = "http://example.com";

new Crawler(domain, {
	'timeout': 2000,
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
}, "p", function (err, result, mergedResult) {

	if (err) return;
});
```



More examples please visit: [examples](https://github.com/hh54188/Smart-Crawler/tree/master/examples)

## API

- `.refetch()`: to refetch the same sites with same parameters;
