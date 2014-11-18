App.directive('autocomplete',
	function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element) {

				element.autocomplete({
					select: function() {
						$timeout(function() {
							element.trigger('input');
						});
					}
				});

				scope.$watch('items', function() {
					var names = scope.items.map(function(item) {
						return item.title;
					});
					names = names.filter(function(el, index, arr) {
						return index == arr.indexOf(el);
					});
					element.autocomplete('option', 'source', names);
				}, true);

				element.on('$destroy', function() {
					element.autocomplete('destroy');
				});

			}
		};
	}
);

App.directive('siiListItem',
	function() {
		return {
			restrict: 'E',
			templateUrl: '/templates/list_item.html',
			replace: true,
			scope: {
				item: '=',
				toggle: '=',
        update: '=',
        remove: '='
			}
		};
	}
);

App.directive('siiSuggestions',
	function($locale, $filter) {
		return {
			restrict: 'E',
			templateUrl: '/templates/suggestions.html',
			replace: true,
			scope: {
				item: '='
			},
			link: function(scope) {

				// Suggestion engine
				function suggest() {
					console.log('suggest');
					var defaultUnit = $filter('i18n')('units.pcs');
					var match, matches;
					var string = scope.item.string || '';
					scope.item.reverse = false;

					// First try "tomatoes 500g" ...
					match = string.match(/ ([0-9]*)(\s?)([a-zA-Z]*?)$/);
					if (match) {
						matches = {
							amount: match[1],
							unit: match[3],
							replace: match[0],
							title: string.replace(match[0], '')
						};
					}
					// ... and if that doesn't match, try "500g tomatoes".
					if (!matches || !matches.amount) {
						match = string.match(/^([0-9]*)(\s?)([a-zA-Z]*?) /);
						if (match) {
							matches = {
								amount: match[1] !== '' ? match[1] : null,
								unit: match[3],
								replace: match[0],
								title: string.replace(match[0], '')
							};
							scope.item.reverse = true;
						}
					}

					if (match && match.length > 1 && (matches && matches.amount)) {
						// Pick title, amound and unit if available ...
						scope.item.title = matches.title;
						scope.item.amount = parseInt(matches.amount, 10);
						scope.item.unit = matches.unit || defaultUnit;
					} else {
						// ... and if not add the whole string to the title.
						scope.item.title = string;
						scope.item.amount = null;
						scope.item.unit = null;
					}
				};

				// Watch for changes in locale id
				scope.$locale = $locale;
				scope.$watch('[$locale.id, item.string] | json', suggest);
			}
		};
	}
);
