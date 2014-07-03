
var P2D = require("../crawler");

var domain = "http://example.com/";

new P2D(domain, "a", function (err, result, merge) {

	if (err) {
		return
	}

	merge.forEach(function ($link) {
		console.log($link.attr("href"));
	});

})