var express = require('express');
var assets   = require('connect-assets');
var mongoose = require('mongoose');
var db       = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/shopping_list');

var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var stylus = require('stylus');
var nib = require('nib');
var app = express();

// Setup app
app.set('port', process.env.PORT || 4000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure stylus
app.use(assets({ paths: ['client/styles'], helperContext: app.locals }));
app.locals.css.root = 'styles';
assets().environment.getEngines('.styl').configure(function(s) { s.use(nib()); });

// Configure jade and views
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'jade');

// Serve static files
app.use('/scripts', express.static(path.join(__dirname, '../client/scripts')));
app.use(express.static(path.join(__dirname, '../client/assets')));

// Routes
require('./routes').init(app);

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
