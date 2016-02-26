// showls.js
// 2016-02-26 replace from sys to util

var	sys = require("sys"),
	spawn = require("child_process").spawn;

var	ls = spawn("ls", ["-la", "/"]);
ls.stdout.addListener("data", function(data){
	sys.print( data);
});
