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
			'createList': 'Create list'
		},
		'shoppingList': {
			'hint': 'Write in form "tomato 500g"…',
			'hideBoughtItems': 'Hide bought items',
			'showAllItems': 'Show all items'
		},
		'email': {
			'newShoppingList': 'New shopping list',
			'hi': 'Your new shopping list',
			'newListCreated': 'We have created a new shopping list for you! The list private in the way that it is not listed on search engines, but it will be visible to anyone you share the link with.',
			'shareInfo': 'Remember that you can easily share the list with your friends by forwarding this email to them!',
			'linkText': 'Copy this link to your browser to start using the list: ',
			'startUsing': 'Link to your new list',
			'thankYous': 'Thank you for using our service!\n\nCheers,\nSiili Solutions Oyj',
			'disclaimer': 'If you didn\'t create the list by yourself you can still either start using the list or discard this email. For more information, see here: '
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
		'email': {
			'newShoppingList': 'Uusi ostoslista',
			'hi': 'Uusi ostoslistasi',
			'newListCreated': 'Olemme luoneet sinulle uuden ostoslistan! Lista ei ole julkinen siinä mielessä, että se ei näy hakukoneiden tuloksissa, mutta sen pääsevät näkemään kaikki joille olet linkin siihen jakanut.',
			'shareInfo': 'Muista, että voit jakaa listan vaivattomasti ystäviesi kanssa lähettämällä tämän sähköpostin heille edelleen!',
			'linkText': 'Kopioi tämä osoite päästäksesi ostoslistaan: ',
			'startUsing': 'Tässä ostoslistasi linkki',
			'thankYous': 'Kiitos, että päätitte käyttää palveluamme!\n\nTerveisin,\nSiili Solutions Oyj',
			'disclaimer': 'Jos et ole itse luonut kyseistä ostoslistaa voit joko ottaa listan silti käyttöösi tai hävittää tämän sähköpostin. Lisää tietoa palvelusta löydät täällä: '
		},
		'units': {
			'pcs': 'kpl'
		}
	},
	'jp': {
		'title': 'Shopping list',
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
		'email': {
			'newShoppingList': 'New shopping list',
			'hi': 'Your new shopping list',
			'newListCreated': 'We have created a new shopping list for you! The list private in the way that it is not listed on search engines, but it will be visible to anyone you share the link with.',
			'shareInfo': 'Remember that you can easily share the list with your friends by forwarding this email to them!',
			'linkText': 'Copy this link to your browser to start using the list: ',
			'startUsing': 'Link to your new list',
			'thankYous': 'Thank you for using our service!\n\nCheers,\nSiili Solutions Oyj',
			'disclaimer': 'If you didn\'t create the list by yourself you can still either start using the list or discard this email. For more information, see here: '
		},
		'units': {
			'pcs': '個'
		}
	}
};

module.exports = function(id) {
	var translation = translations[id] || translations['en-us'];
	return translation;
};
