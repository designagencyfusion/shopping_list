App.directive('autocomplete',
	function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

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
