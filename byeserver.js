// byeserver.js
var net = require("net");

var s = net.createServer();
s.addListener("connection", function(c){
	c.write("bye bye \n");
	c.end();
});

s.listen(8000);

