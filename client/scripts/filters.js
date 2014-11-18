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

		var i18nFilter = function(key, replacement) {
			return findByKeyStr(key) || undefined;
		};

		// TODO: Provide locale ID as model –> stateless filter
		i18nFilter.$stateful = true;
		return i18nFilter;

	}
);

