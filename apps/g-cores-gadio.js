var Crawler = require("../crawler");

var links = [];
var totalPage = 2;
var baseUrl = 'http://www.g-cores.com/categories/9/originals?page=';
for (var i = 1; i <= totalPage ; i++) {
	links.push(baseUrl + i);
}

console.log(links);

function foramtCommon(str) {
	str = str.replace(/\n/g, '');
	str = str.replace(/\s/g, '');
	str = str.replace(/comments/ig, '');
	return str;
}

function formatOfficialOrder(str) {
	str = str.split('.')[1];
	return str;
}

function formatReleaseDate(prefixToRemove, str) {
	str = str.replace(prefixToRemove, '');
	return str;
}

var crawler = new Crawler(links, ".showcase.showcase-audio", function (err, result, merge) {

	if (err) {
		return
	}

	merge.forEach(function ($item) {
		var obj = {};
		
		var linkAddress = $item.find('.showcase_img a').attr('href');
		var title = $item.find('.showcase_text h4 a').text();
		var coverImageAddress = $item.find('.showcase_img a img').attr('src');
		var favourCount = $item.find('.showcase_meta span').first().text();
		var commentsCount = $item.find('.showcase_meta span').last().text();
		var officialOrder = $item.find('.showcase_time span a').text();
		var releaseDate = $item.find('.showcase_time').text();
		
		obj = {
			linkAddress: foramtCommon(linkAddress),
			title: foramtCommon(title),
			coverImageAddress: foramtCommon(coverImageAddress),
			commentsCount: foramtCommon(commentsCount),
			favourCount: foramtCommon(favourCount),
			officialOrder: formatOfficialOrder(foramtCommon(officialOrder)),
			releaseDate: formatReleaseDate(foramtCommon(officialOrder), foramtCommon(releaseDate)),
			releaseDateTimestamp: +new Date(formatReleaseDate(foramtCommon(officialOrder), foramtCommon(releaseDate)))
		}

		console.log(obj);
	});

})