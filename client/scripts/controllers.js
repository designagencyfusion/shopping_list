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

		$scope.items = Item.query({ listId: $routeParams.id });
		$scope.home = '#/shopping-lists/' + $routeParams.id;

		var defaultUnit = '';
		$scope.$locale = $locale;
		$scope.$watch('$locale.id', function() {
			defaultUnit = $filter('i18n')('units.pcs');
		});

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
				$scope.newItem.unit = matches.unit || defaultUnit;
			} else {
				// ... and if not add the whole string to the title.
				$scope.newItem.title = string;
				$scope.newItem.amount = null;
				$scope.newItem.unit = null;
			}
		};

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
			item.$update({ listId: $routeParams.id }, function() {
				$scope.items = Item.query({ listId: $routeParams.id });
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
				$scope.items = Item.query({ listId: $routeParams.id, archived: true });
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
