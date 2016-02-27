var express = require('express');
var serveStatic = require('serve-static');
 
var app = express() 
     .use(serveStatic(__dirname + '/public',{'index': ['default.html', 'default.htm']})) 
     .listen(8888);
