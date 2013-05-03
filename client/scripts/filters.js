App.filter('i18n', [
	'$locale',
	function($locale) {

		var translations = {
			'en-us': {
				'shoppingList': {
					'hint': 'Write in form "tomatoes 500g"...',
					'hideBoughtItems': 'Hide bought items',
					'showAllItems': 'Show all items'
				}
			},
			'fi-fi': {
				'shoppingList': {
					'hint': 'Lisää muodossa "tomaatteja 500g"...',
					'hideBoughtItems': 'Piilota ostetut',
					'showAllItems': 'Näytä kaikki'
				}
			}
		};

		function findByKeyStr(keyStr) {
			var keys = keyStr.split('.');
			var match = translations[$locale.id];
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
]);
