var P2D = require("../crawler");

var domain = "http://example.com/";

new P2D(domain, function (err, result, merge) {

	var $ = result[domain];
	var paragraphs = $('p');
	
	paragraphs.map(function (key, val) {
		console.log($(val).text());
	});
});