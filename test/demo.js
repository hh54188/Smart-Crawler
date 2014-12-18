var Crawler = require("../refactor");

var c = new Crawler({
	url: "http://www.douban.com/group/beijingzufang/discussion?start=0",
	callback: function (err, $) {
		console.log($("#content table tr"));
	}
});