var fs = require('fs');
var ShoppingList = require('./models').shoppingList;
var Item         = require('./models').item;

exports.init = function(app) {

	app.post('/api/shopping-lists', function(req, res) {
		ShoppingList.create(req.body, function(err, list) {
			if (err) {
				res.send(422, err);
			} else {
				res.json(list);
			}
		});
	});

	app.get('/api/shopping-lists/:listId', function(req, res) {
		ShoppingList.findOne({ _id: req.params.listId }, function(err, list) {
			if (err) {
				res.send(422, err);
			} else if (!list){
				res.send(404);
			} else {
				res.json(list);
			}
		});
	});

	app.get('/api/shopping-lists/:listId/items', function(req, res) {
		Item.find({ shoppingListId: req.params.listId }, function(err, items) {
			if (err) {
				res.send(422, err);
			} else {
				res.json(items);
			}
		});
	});

	app.get('/api/shopping-lists/:listId/items/:id', function(req, res) {
		Item.findOne({ _id: req.params.id }, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				res.json(item);
			}
		});
	});

	app.post('/api/shopping-lists/:listId/items', function(req, res) {
		var data = req.body;
		data.shoppingListId = req.params.listId;
		Item.create(req.body, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				res.json(item);
			}
		});
	});

	app.put('/api/shopping-lists/:listId/items/:id', function(req, res) {
		delete req.body._id;
		Item.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				res.json(item);
			}
		});
	});

	app.delete('/api/shopping-lists/:listId/items/:id', function(req, res) {
		Item.remove({ _id: req.params.id }, function(err, item) {
			if (err) {
				res.send(422, err);
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
