var express = require('express');
var app = express();
var fs = require('fs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var mysql = require('mysql');
var dbconn = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'mysqlusr',
        password: '*',
        database: 'myapp'
});

app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8888, function(){
	console.log("Express server has started on port 8888")
});
app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({
	secret: '!@#mykey#@!',
	resave: false,
	saveUninitialized: true
}));
app.use(methodOverride("_method"));

var router = require('./router/main')(app, fs, mysql, dbconn);

var board = require('./router/board');
app.use('/board', board);
