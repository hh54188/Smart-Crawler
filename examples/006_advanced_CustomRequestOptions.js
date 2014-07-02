var P2D = require("../page2dom");

var domain = "http://example.com/";

new P2D(domain, {
	'timeout': 2000,
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36'
    }
}, function (err, result, merge) {
	console.log(result[domain].html());
});