var P2D = require("../page2dom");

var domain1 = "http://example.com/";
var domain2 = "http://example.org/";


new P2D([domain1, domain2], function (err, result, merge) {

	if (err) {
		return
	}

	var $1 = result[domain1];
	var $2 = result[domain2];

	console.log(domain1, " 's source code is\n", $1.html());
	console.log(domain2, " 's source code is\n", $2.html());

})