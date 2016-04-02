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
				controllerAs:'signIn',
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

		function signUp(ev) {
			$mdDialog.show({
				controller: 'SignupController',
				controllerAs: 'signUp',
				templateUrl: 'app/components/signup/signup.modal.html',
				parent: angular.element($document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function() {
				
			}, function() {
				
			});
		}

		function forget(ev) {
			$mdDialog.show({
				controller: 'ForgetController',
				controllerAs: 'forget',
				templateUrl: 'app/components/forget/forget.modal.html',
				parent: angular.element($document.body),
				targetEvent: ev,
				clickOutsideToClose: true,
				fullscreen: false
			})
			.then(function() {
				
			}, function() {
				
			});
		}
	}
})();