// helloweb.js
// 2016-02-26 modified to see streaming
//
var http = require("http");

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type":"text/plain"});
	res.write("He");
	res.write("llo\r\n");

	setTimeout(function(){
		res.write("World\r\n");
		res.end();
	}, 3000);
}).listen(8888);
