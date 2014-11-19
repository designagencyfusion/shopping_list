window.App = angular.module('Shoppinglist', ['ngResource', 'ngCookies', 'ui.router']);


App.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    'use strict';

	$urlRouterProvider.otherwise('/home');

	$stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/templates/home.html',
            controller: 'HomeCtrl'
        })

        // Single shopping-list
        .state('shoppingList', {
            url: '/shopping-lists/:id',
            templateUrl: '/templates/shopping_list.html',
            controller: 'ShoppingListCtrl'
        })

        // Shopping list archives
        .state('shoppingList.archive', {
            url: '/archive',
            templateUrl: '/templates/archive.html',
            controller: 'ArchiveCtrl'
        })

        .state('lang', {
            url: '/lang/:langId',
            templateUrl: '/templates/home.html',
            controller: 'LocaleCtrl'
        })

        .state('notFound', {
            url: '/not-found',
            templateUrl: '/templates/not_found.html'
        })

        .state('listCreated', {
            url: '/list-created',
            templateUrl: '/templates/list_created.html'
        })

        .state('about', {
            url: '/about',
            templateUrl: '/templates/about.html'
        })


	$httpProvider.interceptors.push('ErrorHandlerInterceptor');

});

App.run(function($locale, $cookieStore, $rootScope, $state) {
	$locale.id = $cookieStore.get('preferred-language');
	if (!$locale.id) {
		$locale.id = (document.documentElement.lang || 'en-us').toLowerCase();
	}

    $rootScope.$state = $state;

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
