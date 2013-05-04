App.filter('i18n',
	function($locale) {

		var translations = {
			'en-us': {
				'title': 'Shopping list',
				'defaultUnit': 'pcs',
				'createNewList': 'Create new list',
				'shoppingListNotFound' : 'Couldn\'t find shopping list...',
				'copy': 'Siili Solutions © 2013',
				'home': {
					'emailPlaceholder': 'Email address...',
					'namePlaceholder': 'Name of the list...',
					'createList': 'Create list'
				},
				'shoppingList': {
					'hint': 'Write in form "tomatoes 500g"...',
					'hideBoughtItems': 'Hide bought items',
					'showAllItems': 'Show all items'
				}
			},
			'fi': {
				'title': 'Ostoslista',
				'defaultUnit': 'kpl',
				'createNewList': 'Luo uusi lista',
				'shoppingListNotFound' : 'Ostoslistaa ei löytynyt...',
				'copy': 'Siili Solutions © 2013',
				'home': {
					'emailPlaceholder': 'Sähköpostiosoite...',
					'namePlaceholder': 'Listan nimi...',
					'createList': 'Luo lista'
				},
				'shoppingList': {
					'hint': 'Lisää muodossa "tomaatteja 500g"...',
					'hideBoughtItems': 'Piilota ostetut',
					'showAllItems': 'Näytä kaikki'
				}
			}
		};

		function findByKeyStr(keyStr) {
			var keys = keyStr.split('.');
			var match = translations[$locale.id] || translations['en-us'];
			for (var i = 0; i < keys.length; i++) {
				if (match.hasOwnProperty(keys[i])) {
					match = match[keys[i]];
				} else {
					match = null;
					break;
				}
			}
			return match;
		}

		return function(key, replacement) {
			return findByKeyStr(key);
		};

	}
);
