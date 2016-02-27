var express = require("express");
var app = express()
	.use(function(req,res){
		res.cookie('name', 'naeyo');
		res.end('Hello!');
	})
	.listen(8888);

