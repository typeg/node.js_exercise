// helloworld.js
// 2016-02-26	use console.log instead of sys.puts because it's deprecated
// 		use listener
var console = require("console")

setInterval(function() {
	console.log("hello");
}, 500);

process.addListener("SIGINT", function(){
	console.log("good-bye");
	process.exit(0);
});
