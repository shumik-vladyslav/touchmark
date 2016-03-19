(function() {
	'use strict';

	angular
		.module('app')
		.factory('AuthService', AuthService);

	/** @ngInject */
	function AuthService($mdDialog, $document) {
		var service = {
			signIn: signIn,
			signUp: signUp,
			forget: forget
		};

		return service;

		function signIn(ev) {
			$mdDialog.show({
				controller: 'SigninController',
				templateUrl: 'app/components/signin/signin.modal.html',
				parent: angular.element($document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function() {
				
			}, function() {
				
			});
		}

		function signUp() {

		}

		function forget() {

		}
	}
})();