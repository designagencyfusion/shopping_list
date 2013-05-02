App.filter('i18n', [
	'$locale',
	function($locale) {

		return function(key) {
			return key;
		};

	}
]);
