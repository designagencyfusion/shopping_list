App.controller('HomeCtrl',
	function($scope, $location, ShoppingList) {

		$scope.listTitle = '';
		$scope.creatorEmail = '';
		$scope.createShoppingList = function() {
			new ShoppingList({ title: $scope.listTitle, creatorEmail: $scope.creatorEmail }).$save(function(list) {
				$location.path('/shopping-lists/' + list._id);
			});
		};

	}
);

App.controller('ShoppingListCtrl',
	function($scope, $location, $routeParams, ShoppingList, Item) {

		$scope.sortProperty = 'title';
		$scope.sortOptions = ['title', 'amount', 'unit'];

		$scope.shoppingList = ShoppingList.get({ id: $routeParams.id });

		$scope.items = Item.query({ listId: $routeParams.id });

		$scope.newItem = new Item({
			string: '',
			bought: false
		});

		$scope.formItem = function() {
			var match, matches;
			var string = $scope.newItem.string || '';
			$scope.newItem.reverse = false;

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
					$scope.newItem.reverse = true;
				}
			}

			if (match && match.length > 1 && (matches && matches.amount)) {
				// Pick title, amound and unit if available ...
				$scope.newItem.title = matches.title;
				$scope.newItem.amount = parseInt(matches.amount, 10);
				$scope.newItem.unit = matches.unit || 'kpl';
			} else {
				// ... and if not add the whole string to the title.
				$scope.newItem.title = string;
				$scope.newItem.amount = null;
				$scope.newItem.unit = null;
			}
		};

		$scope.createItem = function() {

			$scope.newItem.$save({ listId: $routeParams.id }, function(item) {
				$scope.items.push(item);
			});

			$scope.newItem = new Item({
				string: '',
				bought: false
			});

		};

		$scope.updateItem = function(item) {
			item.$update({ listId: $routeParams.id });
		};

		$scope.removeItem = function(item) {
			item.$remove({ id: item._id, listId: $routeParams.id }, function() {
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
