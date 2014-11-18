var express = require('express');
var assets   = require('connect-assets');
var mongoose = require('mongoose');
var db       = mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/shopping_list');

var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var stylus = require('stylus');
var nib = require('nib');
var app = express();


app.use(assets({ paths: ['client/styles'], helperContext: app.locals }));
app.locals.css.root = 'styles';
assets().environment.getEngines('.styl').configure(function(s) { s.use(nib()); });

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, '../client/views'));
app.set('view engine', 'jade');
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, '../client/')));
require('./routes').init(app);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
