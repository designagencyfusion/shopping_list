var fs = require('fs');
var ShoppingList = require('./models').shoppingList;
var Item         = require('./models').item;
var translations = require('./translations');

exports.init = function(app) {

	app.post('/api/shopping-lists', function(req, res) {
		var data = req.body;
		data.modified = new Date();
		ShoppingList.create(data, function(err, list) {
			if (err) {
				res.send(422, err);
			} else {
				if (process.env.NODE_ENV == 'production') {
					var SendGrid = require('sendgrid').SendGrid;
					var sendgrid = new SendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
					sendgrid.send({
						to: list.creatorEmail,
						from: 'sender@example.com',
						subject: 'Shopping List: ' + list.title,
						text: req.protocol + "://" + req.get('host') + '/#/shopping-lists/' + list._id
					});
				}
				res.json(list);
			}
		});
	});

	app.get('/api/shopping-lists/:listId', function(req, res) {
		ShoppingList.findOne({ _id: req.params.listId }, function(err, list) {
			if (!list) {
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
		Item.create(data, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				ShoppingList.findOneAndUpdate({ _id: req.params.listId }, { modified: new Date }, function() {
					res.json(item);
				});
			}
		});
	});

	app.put('/api/shopping-lists/:listId/items/:id', function(req, res) {
		delete req.body._id;
		Item.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				ShoppingList.findOneAndUpdate({ _id: req.params.listId }, { modified: new Date }, function() {
					res.json(item);
				});
			}
		});
	});

	app.delete('/api/shopping-lists/:listId/items/:id', function(req, res) {
		Item.remove({ _id: req.params.id }, function(err, item) {
			if (err) {
				res.send(422, err);
			} else {
				ShoppingList.findOneAndUpdate({ _id: req.params.listId }, { modified: new Date }, function() {
					res.json();
				});
			}
		});
	});

	app.get('/api/locales/:id', function(req, res) {
		res.json(translations(req.params.id));
	});

	app.get('*', function(req, res) {
		var path = req.params[0].replace(/^\//, '').replace(/\.html$/, '.jade') || 'index.jade';

		req.acceptedLanguages.forEach(function(id) {
			if (!lang) {
				var languageGroup = id.split('-')[0]
				switch(languageGroup) {
					case 'en':
						lang = 'en-US'
						break;
					case 'fi':
						lang = 'fi'
						break;
				}
			}
		});

		var lang = lang || 'en-US';
		function findByKeyStr(keyStr) {
			var keys = keyStr.split('.');
			var match = translations(lang);
			for (var i = 0; i < keys.length; i++) {
				if (match && match.hasOwnProperty(keys[i])) {
					match = match[keys[i]];
					if (typeof match == 'string') {
						match = match.replace(/"/g, '\\"');
					}
				} else {
					match = null;
					break;
				}
			}
			return match;
		};

		if (fs.existsSync(app.get('views') + '/' + path)) {
			res.render(path, {
				lang: lang,
				translations: translations(lang),
				i18n: function(key) {
					return '(\'' + key + '\' | i18n) || \"' + findByKeyStr(key) + '\"';
				}
			});
		} else {
			res.send(404);
		}
	});

};
