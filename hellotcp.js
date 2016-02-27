// hellotcp.js

var tcp = require("tcp");
tcp.createServer(function(socket){
	socket.on('connect', function(){
			socket.write("Hello, how are you?\n");
	});
	socket.on('data', function(data){
			socket.write(data);
	});
}).listen(8000);
