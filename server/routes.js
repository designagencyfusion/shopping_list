var mongoose = require('mongoose');
var fs = require('fs');
var Item = require('./models').item;

exports.init = function(app) {

	app.get('/api/items', function(req, res) {
		Item.find({}, function(err, items) {
			if (err) {
				res.send(418, err);
			} else {
				res.json(items);
			}
		});
	});

	app.get('/api/items/:id', function(req, res) {
		Item.findOne({ _id: req.params.id }, function(err, item) {
			if (err) {
				res.send(418, err);
			} else {
				res.json(item);
			}
		});
	});

	app.post('/api/items', function(req, res) {
		Item.create(req.body, function(err, item) {
			if (err) {
				res.send(418, err);
			} else {
				res.json(item);
			}
		});
	});

	app.put('/api/items/:id', function(req, res) {
		Item.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, item) {
			if (err) {
				res.send(418, err);
			} else {
				res.json(item);
			}
		});
	});

	app['delete']('/api/items/:id', function(req, res) {
		Item.remove({ _id: req.params.id }, function(err, item) {
			if (err) {
				res.send(418, err);
			} else {
				res.json();
			}
		});
	});

	app.get('*', function(req, res) {
		var path = req.params[0].replace(/^\//, '').replace(/\.html$/, '.jade') || 'index.jade';
		if (fs.existsSync(app.get('views') + '/' + path)) {
			res.render(path);
		} else {
			res.send(404);
		}
	});

};
