
var P2D = require("../crawler");

var domain = "http://example.com/";

new P2D(domain, "h1", function (err, result, merge) {

	if (err) {
		return
	}

	merge.forEach(function ($head) {
		console.log($head.text());
	});

})