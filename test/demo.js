var Crawler = require("../refactor");

var c = new Crawler({
	url: "http://example.com",
	selector: "p",
	callback: function (err, $) {
		console.log("$--->", $);
	}
});