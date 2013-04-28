window.App = angular.module('Shoppinglist', ['ngResource']);

App.config([
	'$routeProvider', function($routeProvider) {
		return $routeProvider

			.when('/',                   { controller: 'HomeCtrl',         templateUrl: '/templates/home.html' })
			.when('/shopping-lists/:id', { controller: 'ShoppingListCtrl', templateUrl: '/templates/shopping_list.html' })
			.otherwise({ redirectTo: '/' });

	}
]);

window.onload = function() {
	if ('ontouchstart' in document) {
		var body = document.getElementsByTagName('body')[0];
		body.className = body.className + ' touch';
	}
};
