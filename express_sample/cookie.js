var express = require("express");
var app = express()
	.use(function(req,res){
		console.log('---client request cookies header:\n', req.headers['cookie']);
		res.cookie('name', 'naeyo');
		res.end('Hello!');
	})
	.listen(8888);

