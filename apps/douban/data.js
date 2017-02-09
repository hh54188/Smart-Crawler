var Crawler = require("../../crawler");
var fs = require('fs');

var groups = [
	'https://www.douban.com/group/beijingzufang/discussion',
	'https://www.douban.com/group/fangzi/discussion',
	'https://www.douban.com/group/zhufang/discussion',
	'https://www.douban.com/group/276176/discussion',
	'https://www.douban.com/group/26926/discussion',
	'https://www.douban.com/group/sweethome/discussion',
	'https://www.douban.com/group/242806/discussion',
	'https://www.douban.com/group/279962/discussion',
	'https://www.douban.com/group/334449/discussion'	
];

var totalPage = 10;
var piecesPerPage = 25;
var targetAddresses = [];
var dataResult = [];

// 测试数据：
var groups = [
	'https://www.douban.com/group/beijingzufang/discussion'
]
var totalPage = 1;
var piecesPerPage = 25;

groups.forEach(function (groupAddress) {
	for (var i = 0; i < totalPage; i++) {
		targetAddresses.push(groupAddress + '?start=' + i * piecesPerPage);
	}
});

var crawler = new Crawler(targetAddresses, {
		headers: {
	    	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
	    }, 
	}, "#content .title a", function (err, result, mergedResult) {
		mergedResult.forEach(function ($element) {
			var title = $element.attr('title');
			var href = $element.attr('href');
			var id = href.split('/')[5];

			if (title) {
				dataResult.push({
					id: id,
					title: title,
					href: href,
					timestamp: +new Date
				});
			}
		});

		console.log(dataResult);
});
