
var P2D = require("../crawler");

var domain = "http://example.com/";

new P2D(domain, function (err, result, merge) {

	if (err) {
		return
	}

	var $ = result[domain];
	// var $ = merge[0];

	console.log($.html())

})