App.controller('LocaleCtrl',
	function($scope, $routeParams, $location, $locale, $cookieStore) {

		$scope.localeOptions = [
			{ id: 'en-us', title: 'In English' },
			{ id: 'fi', title: 'Suomeksi' },
			{ id: 'sv', title: 'På Svenska' },
			{ id: 'jp', title: '日本語' }
		];
		$scope.setLocale = function(id) {
			$locale.id = id;
			$cookieStore.put('preferred-language', id);
		};
		$scope.$locale = $locale;
		$scope.$watch('$locale.id', function() {
			$scope.setLocale($locale.id);
		});

		if ($routeParams.langId) {
			$scope.setLocale($routeParams.langId);
			$location.path('/');
		}
	}
);

App.controller('HomeCtrl',
	function($scope, $location, $locale, $cookieStore, ShoppingList) {

		$scope.listTitle = '';
		$scope.creatorEmail = '';

		$scope.createShoppingList = function() {
			$scope.submit = true;
			if ($scope.listTitle && $scope.creatorEmail) {
				new ShoppingList({ title: $scope.listTitle, creatorEmail: $scope.creatorEmail, lang: $locale.id }).$save(function(list) {
					$location.path('/list-created');
				});
			}
		};

	}
);

App.controller('ShoppingListCtrl',
	function($scope, $routeParams, $filter, ShoppingList, Item, Locale, $locale, $cookieStore) {

		$scope.shoppingList = ShoppingList.get({ id: $routeParams.id });

		$scope.items = Item.query({ listId: $routeParams.id, archived: false });
		$scope.home = '#/shopping-lists/' + $routeParams.id;

		$scope.newItem = new Item({
			string: '',
			bought: false
		});

		$scope.createItem = function() {

			if ($scope.newItem.unit) {
				var units = Locale.get($locale.id).units;
				for (key in units) {
					if (units.hasOwnProperty(key) && units[key] == $scope.newItem.unit ) {
						$scope.newItem.unit = key;
					}
				}
			}

			$scope.newItem.$save({ listId: $routeParams.id }, function(item) {
				$scope.items.push(item);
			});

			$scope.newItem = new Item({
				string: '',
				bought: false
			});

		};

		$scope.updateItem = function(item) {
			item.$update({ listId: $routeParams.id }, function(item) {
				if (item.archived) {
					$scope.items.splice($scope.items.indexOf(item), 1);
				}
			});
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

		var listFilterCookie = 'list-filter';
		$scope.listFilter = $cookieStore.get(listFilterCookie);
		$scope.toggleVisibleItems = function() {
			$scope.listFilter = $scope.listFilter ? null : { bought: 'false' };
			$cookieStore.put(listFilterCookie, $scope.listFilter);
		};

	}
);

App.controller('ArchiveCtrl',
	function($scope, $routeParams, ShoppingList, Item) {

		$scope.shoppingList = ShoppingList.get({ id: $routeParams.id });

		$scope.home = '#/shopping-lists/' + $routeParams.id;
		$scope.items = Item.query({ listId: $routeParams.id, archived: true });

		$scope.updateItem = function(item) {
			item.$update({ listId: $routeParams.id }, function() {
				if (!item.archived) {
					$scope.items.splice($scope.items.indexOf(item), 1);
				}
			});
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
