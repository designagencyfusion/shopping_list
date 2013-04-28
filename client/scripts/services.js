App.factory('ShoppingList', function($resource) {
	return $resource('/api/shopping-lists/:id', { id: '@id' }, { update: { method: 'PUT' } });
});
App.factory('Item', function($resource) {
	return $resource('/api/shopping-lists/:listId/items/:id', { id: '@_id', listId: '@listId' }, { update: { method: 'PUT' } });
});
