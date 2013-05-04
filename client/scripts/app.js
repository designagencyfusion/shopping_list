window.App = angular.module('Shoppinglist', ['ngResource']);

App.config(function($routeProvider, $httpProvider) {
	$routeProvider

		.when('/',                   { controller: 'HomeCtrl',         templateUrl: '/templates/home.html' })
		.when('/shopping-lists/:id', { controller: 'ShoppingListCtrl', templateUrl: '/templates/shopping_list.html' })
		.when('/not-found',          {                                 templateUrl: '/templates/not_found.html' })
		.otherwise({ redirectTo: '/' });

	$httpProvider.responseInterceptors.push('ErrorHandlerInterceptor');

});

// App.run(function($rootScope, $locale) {
// 	$rootScope.setLocale = function(localeId) {
// 		$locale.id = localeId;
// 	};
// });

App.factory('ErrorHandlerInterceptor', [
	'$q', '$window', '$location',
	function($q, $window, $location) {
		function success(response) {
			return response;
		}
		function error(response) {
			if (response.status == 404) {
				$location.path('/not-found');
			}
			return $q.reject(response);
		}
		return function(promise) {
			return promise.then(success, error);
		};
	}
]);

window.onload = function() {
	if ('ontouchstart' in document) {
		var body = document.getElementsByTagName('body')[0];
		body.className = body.className + ' touch';
	}
};
