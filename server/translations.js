var translations = {
	'en-us': {
		'title': 'Shopping list',
		'defaultUnit': 'pcs',
		'createNewList': 'Create new list',
		'shoppingListNotFound' : 'Couldn\'t find shopping list…',
		'copy': 'Siili Solutions © 2013',
		'home': {
			'emailPlaceholder': 'Email address…',
			'namePlaceholder': 'Name of the list…',
			'createList': 'Create\' list'
		},
		'shoppingList': {
			'hint': 'Write in form "tomato 500g"…',
			'hideBoughtItems': 'Hide bought items',
			'showAllItems': 'Show all items'
		},
		'units': {
			'pcs': 'pcs'
		}
	},
	'fi': {
		'title': 'Ostoslista',
		'createNewList': 'Luo uusi lista',
		'shoppingListNotFound' : 'Ostoslistaa ei löytynyt…',
		'copy': 'Siili Solutions © 2013',
		'home': {
			'emailPlaceholder': 'Sähköpostiosoite…',
			'namePlaceholder': 'Listan nimi…',
			'createList': 'Luo lista'
		},
		'shoppingList': {
			'hint': 'Lisää muodossa "tomaatti 500g"…',
			'hideBoughtItems': 'Piilota ostetut',
			'showAllItems': 'Näytä kaikki'
		},
		'units': {
			'pcs': 'kpl'
		}
	},
	'jp': {
		'title': 'Shopping list',
		// 'title': 'ショッピング リスト',
		// 'title': 'お買い物リスト',
		'createNewList': '新しいリストを作る',
		'shoppingListNotFound' : 'ショッピングリストが見つかりません…',
		'copy': 'Siili Solutions © 2013',
		'home': {
			'emailPlaceholder': 'メールアドレス…',
			'namePlaceholder': 'リストの名前…',
			'createList': 'リストを作る'
		},
		'shoppingList': {
			'hint': '書き込み例　"トマト 500g…"',
			'hideBoughtItems': '買ったアイテムを隠す',
			'showAllItems': '全てのアイテムを見る'
		},
		'units': {
			'pcs': '個'
			// 'pcs': 'ヶ'
		}
	}
};

module.exports = function(id) {
	var translation = translations[id] || translations['en-us'];
	return translation;
};
