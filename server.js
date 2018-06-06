/**
 * Created by shenlisha on 2018/6/6.
 */

var express = require('express'),
	path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'dist/')));

app.listen(8082, function() {
	console.log('server is listening 8082');
});
