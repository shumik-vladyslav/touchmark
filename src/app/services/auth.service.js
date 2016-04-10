(function() {
	'use strict';

	angular
		.module('app')
		.factory('AuthService', AuthService);

	/** @ngInject */
	function AuthService($mdDialog, $document, toastr, $localStorage, $state) {
		var users = [
			{
				email: 'user1@mail.com',
				password: 'User1'
			},
			{
				email: 'user2@mail.com',
				password: 'User2'
			}
		];
		var service = {
			signIn: signIn,
			signUp: signUp,
			forget: forget,
			checkUserExist: checkUserExist,
			rememberPassword: rememberPassword,
			registerUser: registerUser,
			isAuthorized: isAuthorized,
			getUserInfo: getUserInfo,
			logOut: logOut,
			demoUser: demoUser
		};

		return service;

		function demoUser() {
			return users[0];
		}

		function isAuthorized() {
			if(angular.isDefined($localStorage.user) && angular.isDefined($localStorage.user.email)) {
				return true;
			}
			return false;
		}

		function userExist(user, password) {
			var result = false;
			for(var i=0;i<users.length;i++){
				if(password) {
					if(users[i].email===user.email && users[i].password === user.password) {
						result = true;
					}
				} else {
					if(users[i].email===user.email) {
						result = true;
					}
				}
			}
			return result;
		}

		function checkUserExist(user) {
			if(userExist(user, true)) {
				setUser(user);
				toastr.success(user.email, 'Welcome!');
				return true;
			} else {
				toastr.error('User not found', 'Sign In');
				return false;
			}
		}

		function rememberPassword(email) {
			var result = false;
			for(var i=0;i<users.length;i++){
				if(users[i].email === email) {
					result = users[i].password;
				}
			}
			return result;
		}

		function setUser(user) {
			$localStorage.user = user;
		}

		function getUserInfo() {
			return $localStorage.user;
		}

		function logOut() {
			// delete $localStorage.user;
			$localStorage.user = {};
			$state.go('main.home');
		}

		function registerUser(user) {
			if(!userExist(user)) {
				users.push(user);
				toastr.success('Successfully', 'Sign Up');
				return true;
			} else {
				toastr.warning('User exist', 'Sign Up');
				return false;
			}
		}

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