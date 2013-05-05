App.factory('ShoppingList', function($resource) {
	return $resource('/api/shopping-lists/:id', { id: '@id' }, { update: { method: 'PUT' } });
});
App.factory('Item', function($resource) {
	return $resource('/api/shopping-lists/:listId/items/:id', { id: '@_id', listId: '@listId' }, { update: { method: 'PUT' } });
});
App.service('Locale',
	function($http, $cookieStore) {
		var que = {};
		var locales = {};
		return {
			get: function(id) {
				if (!que[id] && !locales[id]) {
					var cookieId = 'locale-' + id;
					que[id] = true;
					$http.get('/api/locales/' + id).success(function(response) {
						locales[id] = response;
						que[id] = false;
						$cookieStore.put(cookieId, response);
					});
				}
				if (!locales[id]) {
					locales[id] = $cookieStore.get(cookieId);
				}
				return locales[id] || null;
			}
		};
	}
);
