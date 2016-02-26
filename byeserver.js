// byeserver.js
// 2016-02-26 connection event listener can be an arguement of createServer
var net = require("net");

net.createServer( function(c){
	c.write("bye bye \n");
	c.end();
}).listen(8000);

