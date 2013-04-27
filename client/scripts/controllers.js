App.controller('ShoppinglistCtrl',
	function($scope, Item) {

		$scope.sortProperty = 'title';
		$scope.sortOptions = ['title', 'amount', 'unit'];

		$scope.items = Item.query();

		$scope.inputString = '';

		$scope.createItem = function(text) {
			var item = {
				bought: false
			};
			var match = text.match(/ ([0-9]*?)((?![0-9]).*)$/);

			// Tomaatti 12kg
			// Tomaatti mehu tiiviste 12kg

			// Tomaatti 12 kg
			// Tomaatti mehu 12kg
			// Kengät kokoa 43 2kpl
			// Kengät kokoa 43 2 kpl

			// Kengät kokoa 43eur  -> 1kpl
			// Kengät kokoa 43 eur -> 1kpl

			// / ([0-9]*?)((?![0-9]).*)$/

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

		$scope.updateItem = function(item) {
			item.$update();
		};

		$scope.removeItem = function(item) {
			item.$remove(function() {
				$scope.items.splice($scope.items.indexOf(item), 1);
			});
		};

		$scope.toggleBought = function(item, e) {
			if (e.target.nodeName == 'INPUT') return;
			item.bought = !item.bought;
			$scope.updateItem(item);
		};

	}
);
