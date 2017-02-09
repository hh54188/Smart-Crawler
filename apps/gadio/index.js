var Crawler = require("../crawler");
var domain = 'http://example.com';

new Crawler(domain, function (err, result) {
	var $ = result[domain];
	console.log($.html());
});

new Crawler(domain, function (err, result) {
	var $ = result[domain];
	$('p').text();
	$('a').attr('href');
	console.log($('p').html());
});

new Crawler(domain, 'p', function (err, result) {
	var paragraphs = result[domain];
	paragraphs.forEach(function ($p) {
		console.log($p.text());
	})
});

new Crawler(domain, {
	'timeout': 2000,
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
}, function (err, result) {
	console.log(result.requestOptions);
});