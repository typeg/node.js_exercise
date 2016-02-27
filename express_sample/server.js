var express = require('express');
var app = express();
var fs = require('fs');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8888, function(){
	console.log("Express server has started on port 8888")
});
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({
	secret: '!@#mykey#@!',
	resave: false,
	saveUninitialized: true
}));

var router = require('./router/main')(app, fs);
