var express = require("express");
var cookieParser = require("cookie-parser");
var app = express()
	.use(cookieParser())
	.use(function(req, res){
		if(req.cookies.name){
			console.log('User name: ', req.cookies.name);
		}else{
			res.cookie('name', 'naeyo');
		}
		res.end('Hello! ' + req.cookies.name);
	})
	.listen(8888);
