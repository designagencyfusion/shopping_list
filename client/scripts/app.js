window.App = angular.module('Shoppinglist', ['ngResource', 'ngCookies', 'ngRoute', 'ui.router']);

App.config(function($routeProvider, $httpProvider) {
	$routeProvider

		.when('/',                           { controller: 'HomeCtrl',         templateUrl: '/templates/home.html' })
		.when('/shopping-lists/:id',         { controller: 'ShoppingListCtrl', templateUrl: '/templates/shopping_list.html' })
		.when('/shopping-lists/:id/archive', { controller: 'ArchiveCtrl',      templateUrl: '/templates/archive.html' })
		.when('/lang/:langId',               { controller: 'LocaleCtrl',       templateUrl: '/templates/home.html' })
		.when('/not-found',                  {                                 templateUrl: '/templates/not_found.html' })
		.when('/list-created',               {                                 templateUrl: '/templates/list_created.html' })
		.otherwise({ redirectTo: '/' });

	$httpProvider.interceptors.push('ErrorHandlerInterceptor');

});

App.run(function($locale, $cookieStore) {
	$locale.id = $cookieStore.get('preferred-language');
	if (!$locale.id) {
		$locale.id = (document.documentElement.lang || 'en-us').toLowerCase();
	}
});

App.factory('ErrorHandlerInterceptor',
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
);

window.onload = function() {
	if ('ontouchstart' in document) {
		var body = document.getElementsByTagName('body')[0];
		body.className = body.className + ' touch';
	}
};
