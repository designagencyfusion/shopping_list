App.controller('ShoppinglistCtrl',
	function($scope, Item) {

		$scope.sortProperty = 'title';
		$scope.sortOptions = ['title', 'amount', 'unit'];

		$scope.items = Item.query();

		$scope.newItem = new Item({
			string: '',
			bought: false
		});

		$scope.formItem = function() {
			if (!$scope.newItem.string) $scope.newItem.string = '';
			var match = $scope.newItem.string.match(/ ([0-9]*)(\s?)([a-zA-Z]*?)$/);
			if (match && match.length > 1 && match[1]) {
				$scope.newItem.title = $scope.newItem.string.replace(match[0], '');
				$scope.newItem.amount = parseInt(match[1], 10);
				$scope.newItem.unit = match[3] ? match[3] : 'kpl';
			} else {
				$scope.newItem.title = $scope.newItem.string;
				$scope.newItem.amount = null;
				$scope.newItem.unit = null;
			}
		};

		$scope.createItem = function() {

			$scope.newItem.$save(function(item) {
				$scope.items.push(item);
			});

			$scope.newItem = new Item({
				string: '',
				bought: false
			});
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
			if (e.target.nodeName == 'INPUT' || e.target.nodeName == 'A') return;
			item.bought = !item.bought;
			$scope.updateItem(item);
		};

	}
);
