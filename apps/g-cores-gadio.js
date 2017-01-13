var Crawler = require("../crawler");
var fs = require('fs');

var links = [];
var totalPage = 1;
var baseUrl = 'http://www.g-cores.com/categories/9/originals?page=';
for (var i = 1; i <= totalPage ; i++) {
	links.push(baseUrl + i);
}

var gadioResults = [];
var gadioCount = 0;

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

function fixUsername(name) {
	if (name.indexOf('...') > -1) {
		if (name.indexOf('andorge') > -1) {
			name = 'andorgenesis4324';
		}

		if (name.indexOf('ziondan') > -1) {
			name = 'ziondandada';
		}

		if (name.indexOf('gorigor') > -1) {
			name = 'gorigori_attack';
		}
	}

	return name;
}

var crawler = new Crawler(links, ".showcase.showcase-audio", function (err, result, merge) {

	if (err) {
		return;
	}

	gadioCount = merge.length;

	merge.forEach(function ($item) {
		var obj = {};
		
		var linkAddress = foramtCommon($item.find('.showcase_img a').attr('href'));
		var title = foramtCommon($item.find('.showcase_text h4 a').text());
		var coverImageAddress = foramtCommon($item.find('.showcase_img a img').attr('src'));
		var favourCount = foramtCommon($item.find('.showcase_meta span').first().text());
		var commentsCount = foramtCommon($item.find('.showcase_meta span').last().text());
		var officialOrder = foramtCommon($item.find('.showcase_time span a').text());
		var releaseDate = foramtCommon($item.find('.showcase_time').text());

		new Crawler(linkAddress, '.story_djs_items a', function (err, result, merge) {

			var hosts = [];
			
			merge.forEach(function ($item) {
				var userName = foramtCommon($item.text());
				var userLinkAddress = foramtCommon($item.attr('href'));
				var avatarImageAddress = foramtCommon($item.find('.img-circle').attr('src'));

				hosts.push({
					userName: fixUsername(userName),
					userLinkAddress: userLinkAddress,
					avatarImageAddress: avatarImageAddress,
				});
			})


			obj = {
				linkAddress: linkAddress,
				title: title,
				coverImageAddress: coverImageAddress,
				commentsCount: commentsCount,
				favourCount: favourCount,
				officialOrder: formatOfficialOrder(officialOrder),
				releaseDate: formatReleaseDate(officialOrder, releaseDate),
				releaseDateTimestamp: +new Date(formatReleaseDate(officialOrder, releaseDate)),
				hosts: hosts
			}

			gadioResults.push(obj);
			gadioCount--;

			if (gadioCount <= 0) {
				console.log(gadioResults.length);
				fs.writeFileSync('./gadio.json', JSON.stringify(gadioResults, null, 4));
				process.exit();
			}
		});
	});
});