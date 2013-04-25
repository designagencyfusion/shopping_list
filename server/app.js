var express  = require('express');
var http     = require('http');
var assets   = require('connect-assets');
var mongoose = require('mongoose');
var db       = mongoose.connect('mongodb://localhost:27017/shopping_list');
var app      = express();

app.use(assets({ src: 'client' }));

css.root = 'styles';

app.configure(function() {
	app.set('port', process.env.PORT || 4000);
	app.set('views', 'client/views');
	app.set('view engine', 'jade');
	app.locals.pretty = true;
	app.use(express['static']('client'));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

	app.use(express.logger('dev'));
	mongoose.set('debug', true);
});

require('./routes').init(app);

http.createServer(app).listen(app.get('port'), function() {
	return console.log('Express server listening on port ' + app.get('port'));
});
