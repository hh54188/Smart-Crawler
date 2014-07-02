/*
    Because involve timeout test and multiple site fetch,
    test need longer timeout:

    mocha test.js -t 20000
*/

var P2D = require("../page2dom");
var request = require("request");

describe("Basic function", function (done) {
    it ("should output cheerio wrapped body to callback when no selector specified", function (done) {

        var domain = "http://www.baidu.com";

        new P2D(domain, function (err, result) {
            if (err) {
                return;
            }
            /*
                It's diffcult to varify what $ exactly return,
                what I can varified is it has body
            */            
            if (result[domain].html().length) {
                done();
            }
        });
    });

    it ("should output selector result when selector specified", function (done) {

        var domain = "http://example.com/";
        var isArray = function () {
            return Object.prototype.toString.call(arguments[0]) == "[object Array]"? true: false;
        }

        new P2D(domain, "p", function (err, result) {
            if (err) {
                return;
            }
            
            if (isArray(result[domain]) && result[domain].length != 0) {
                done();
            }
        });
    });

    it ("output selector result length should be zero when no element matched", function (done) {

        var domain = "http://example.com/";
        var isArray = function () {
            return Object.prototype.toString.call(arguments[0]) == "[object Array]"? true: false;
        }

        new P2D(domain, "img", function (err, result) {
            if (err) {
                return;
            }

            if (isArray(result[domain]) && result[domain].length === 0) {
                done();
            }
        });
    });

    it ("should contain multiple result when multiple urls specified", function (done) {

        var domain1 = "http://www.baidu.com";
        var domain2 = "http://example.com";

        new P2D([domain1, domain2], function (err, result) {

            if (err) {
                return;
            }

            if (result[domain1].html().length != 0 && result[domain2].html().length != 0 ) {
                done();
            }
        });
    });

    it ("should contain multiple result when multiple urls and selector specified", function (done) {

        var domain1 = "http://www.baidu.com";
        var domain2 = "http://example.com";

        var isArray = function () {
            return Object.prototype.toString.call(arguments[0]) == "[object Array]"? true: false;
        }

        new P2D([domain1, domain2], "p", function (err, result) {

            if (err) {
                return;
            }

            if (isArray(result[domain1]) && isArray(result[domain2])) {
                done();
            }
        });
    });

});

describe ("Merge result", function () {

    var domain1 = "http://www.baidu.com";
    var domain2 = "http://example.com";

    var isArray = function () {
        return Object.prototype.toString.call(arguments[0]) == "[object Array]"? true: false;
    }

    it ("should return an array when request single url", function (done) {
        new P2D(domain1, function (err, result, merge) {
            if (err) {
                return;
            }

            if (isArray(merge)) {
                done();
            }
        });
    });

    it ("should return an array when request multiple urls", function (done) {
        new P2D([domain1, domain2], function (err, result, merge) {
            if (err) {
                return;
            }

            if (isArray(merge)) {
                done();
            }
        });
    });

    it ("should return an array when request single url with selector", function (done) {
        new P2D(domain1, "p", function (err, result, merge) {
            if (err) {
                return;
            }

            if (isArray(merge)) {
                done();
            }
        });
    });

    it ("should return an array when request multiple urls with selector", function (done) {
        new P2D([domain1, domain2], "p", function (err, result, merge) {
            if (err) {
                return;
            }

            if (isArray(merge)) {
                done();
            }
        });
    });        
});

describe('URL', function () {
    /*
        Invalid URL TEST;
    */
    it ("should throw an error when url is invalid", function (done) {
        new P2D("ThisDomainShouldNotExist", function (err, $) {
            if (err) {
                done();
            }
        });
    });

    /*
        Invalid URL TEST(without protocal);
    */
    it ("should throw an error without 'http' prefix", function (done) {
        new P2D("www.baidu.com", function (err, $) {
            if (err) {
                done();
            }
        });
    });

    /*
        Valid URL TEST
    */
    it ("should passed when single url is vaild", function (done) {
        new P2D("http://www.baidu.com", function (err, $) {
            if (err) {
                return;
            }
            done();
        });
    });

    /*
        Multiple valid URL TEST
    */
    it ("should passed when multiple urls is vaild", function (done) {
        new P2D([
            "http://www.baidu.com", 
            "http://www.renren.com",
            "http://weibo.com"], function (err, $) {
            if (err) {
                return;
            }
            done();
        });
    });

    /*
        Multiple invalid URL TEST
    */
    it ("should throw an error when one of multiple urls is invalid", function (done) {
        new P2D([
            "http://www.baidu.com", 
            "ThisDomainShouldNotExist",
            "http://www.renren.com"], function (err, $) {
            if (err) {
                done();
            }
        });
    });    

    /*
        Request timeout TEST
    */
    it ("should throw an error when request timeout", function (done) {
        new P2D("http://www.facebook.com", {
            timeout: 3000
        }, function (err, $) {
            if (err) {
                done();
            }
        })
    });
});

describe("Promises/A+", function () {

    it ("should be rejected when an error throw", function (done) {
        new P2D("ThisDomainShouldNotExist").then(function (result) {

        }, function (err) {
            if (err) {
                done();
            }
        });
    });

    it ("should be resolved when single URI requested successed", function (done) {
        new P2D("http://www.baidu.com").then(function (result) {
            done();
        }, function (err) {

        });
    });

    it ("should be resolved when multiple URIs requested successed", function (done) {
        new P2D([
            "http://www.baidu.com",
            "http://www.renren.com",
            "http://weibo.com"
        ]).then(function (result) {
            done();
        }, function (err) {

        });
    });    

    it ("should not be resolved when callback passed in", function (done) {
        new P2D("http://www.baidu.com", function (err, $) {
            if (err) return;
            done();
        }).then(function (result) {

        }, function (err) {

        });
    });    
});