var fs = require('fs');
var moment = require('moment');
var ShoppingList = require('./models').shoppingList;
var Item         = require('./models').item;
var translations = require('./translations');
var createEmail  = require('./email');

exports.init = function(app) {

	app.post('/api/shopping-lists', function(req, res) {
		var data = req.body;
		data.modified = new Date();
		ShoppingList.create(data, function(err, list) {
			if (err) {
				res.send(422, err);
			} else {
				createEmail({
					id: list._id,
					name: list.title,
					lang: req.body.lang,
					creatorEmail: list.creatorEmail,
					addressToService: req.protocol + "://" + req.get('host') + '/'
				}, function(email) {
					if (process.env.NODE_ENV == 'production') {
						var SendGrid = require('sendgrid').SendGrid;
						var sendgrid = new SendGrid(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
						sendgrid.send(email);
					} else {
						console.log(email);
					}
				});
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
		var query = { shoppingListId: req.params.listId };
		var archived = req.query.archived;
		var lastWeek = moment().subtract(1, 'week');
		console.log(lastWeek);
		if (archived) {
			query.bought = true;
		}
		Item.find(query, function(err, items) {
			if (err) {
				res.send(422, err);
			} else {
				var results = [];
				items.forEach(function(item) {
					var oldItem = lastWeek.isBefore(moment(item.created));
					if (!archived && !oldItem) {
						results.push(item);
					} else {
						results.push(item);
					}
				});
				res.json(results);
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
		// require('./items').update();
		res.json(translations(req.params.id));
	});

	app.get('*', function(req, res) {

		var path = req.params[0].replace(/^\//, '').replace(/\.html$/, '.jade') || 'index.jade';
		if (!path.match(/_email.jade$/) && fs.existsSync(app.get('views') + '/' + path)) {
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
						case 'sv':
							lang = 'sv'
							break;
						case 'jp':
							lang = 'jp'
							break;
					}
				}
			});

			var lang = lang || 'en-US';
			var translation = translations(lang);
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

			res.render(path, {
				lang: lang,
				translations: translation,
				i18n: function(key) {
					return '(\'' + key + '\' | i18n) || \"' + findByKeyStr(key) + '\"';
				}
			});
		} else {
			res.send(404);
		}
	});

};
