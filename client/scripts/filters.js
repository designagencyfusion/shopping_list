App.filter('i18n',
	function($locale, Locale) {
		
		var translations = {};

		function findByKeyStr(keyStr) {
			var keys = keyStr.split('.');
			var match = Locale.get($locale.id);
			for (var i = 0; i < keys.length; i++) {
				if (match && match.hasOwnProperty(keys[i])) {
					match = match[keys[i]];
				} else {
					match = null;
					break;
				}
			}
			return match;
		}

		return function(key, replacement) {
			return findByKeyStr(key) || undefined;
		};

	}
);

