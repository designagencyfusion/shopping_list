window.App = angular.module('Shoppinglist', ['ngResource']);

window.onload = function() {
	if ('ontouchstart' in document) {
		var body = document.getElementsByTagName('body')[0];
		body.className = body.className + ' touch';
	}
};
