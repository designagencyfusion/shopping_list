App.controller('ShoppinglistCtrl',
	function($scope, $resource) {

		var Item = $resource('/api/items');

		$scope.items = Item.query();

		$scope.inputString = '';

		$scope.sortProperty = 'title';

		$scope.sortOptions = ['title', 'amount', 'unit'];

		$scope.createItem = function(text) {
			var item = {
				bought: false
			};
			var match = text.match(/ ([0-9]*?)((?![0-9]).*)$/);
			if (match && match.length > 2) {
				item.title = text.replace(match[0], '');
				item.amount = parseInt(match[1], 10);
				item.unit = match[2];
			} else {
				item.title = text;
			}

			var newItem = new Item(item);
			newItem.$save(function(item) {
				$scope.items.push(item);
			});

			$scope.inputString = '';
		};

		$scope.removeItem = function(item) {
			
			$scope.items.splice($scope.items.indexOf(item), 1);
		};

	}
);
