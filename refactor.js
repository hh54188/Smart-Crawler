var request = require('request');
var cheerio = require('cheerio');


var defaultRequestOpts = {
    'encoding': "utf8",
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:33.0) Gecko/20100101 Firefox/33.0'
    }
};

function Crawler (paramObj) {
	
	this.url = paramObj.url || "http://example.com";
	this.headers = paramObj.headers || defaultRequestOpts;
	this.selector = paramObj.selector;
	this.callback = paramObj.callback;

    this.fetch();
}

Crawler.prototype.fetch = function () {
	var _this = this;
    this.headers.url = this.url;

	request(this.headers, function(err, response, body) {
		var $ = cheerio.load(body);
        var result = $;

        if (err) {
            if (_this.callback) {
                _this.callback(err, null);
                return false;
            }
            return false;
        }

        if (_this.selector) {
            result = $(_this.selector).map(function (index, item) {
                return $(item);
            });
        }


        if (_this.callback) {
            _this.callback(null, result);
            return true;    
        }
	});
}

module.exports = Crawler;