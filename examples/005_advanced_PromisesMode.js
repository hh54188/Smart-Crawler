
var P2D = require("../page2dom");

var domain = "http://example.com/";

new P2D(domain).then(function (result) {

	console.log(result[domain].html());

}, function (err) {

})