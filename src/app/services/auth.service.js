(function() {
	'use strict';

	angular
		.module('app')
		.factory('AuthService', AuthService);

	/** @ngInject */
	function AuthService($mdDialog, $document, toastr, $localStorage, $state, CommonService) {
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
				$state.go('main.projects');
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

    function signIn(ev){
      CommonService.formDialog(
        ev,
        {
          title: 'Sign In',
          result: {
            email: 'user1@mail.com',
            password: 'User1'
          },
          items: [
            {
              type:'input',
              subtype: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              validators: {
                'ng-pattern': /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/
              },
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                },
                {
                  type: 'pattern',
                  message: 'This is not valid.'
                }
              ]
            },
            {
              type:'input',
              subtype: 'password',
              name: 'password',
              label: 'Password',
              required: true,
              validators: {
                'maxlength': 20,
                'minlength': 4,
                'ng-pattern': /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/
              },
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                },
                {
                  type: 'pattern',
                  message: 'Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)'
                },
                {
                  type: 'minlength',
                  message: 'Passwords must be more than 4 characters'
                },
                {
                  type: 'maxlength',
                  message: 'Passwords must be less than 20 characters'
                }
              ]
            }
          ],
          action: {
            submit: {
              name: 'Log In',
              classes: "md-warn md-raised"
            },
            items: [
              {
                type: 'button',
                text: 'Forgot password?',
                action: forget,
                classes: "md-primary md-raised"
              }
            ]
          }
        }
      ).then(function(data){
        if(!checkUserExist(data)){
          signIn(ev);
        }
      });
    }

		function signUp(ev) {
      CommonService.formDialog(
        ev,
        {
          title: 'Sign Up',
          items: [
            {
              type:'input',
              subtype: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              validators: {
                'ng-pattern': /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/
              },
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                },
                {
                  type: 'pattern',
                  message: 'This is not valid.'
                }
              ]
            },
            {
              type:'input',
              subtype: 'password',
              name: 'password',
              label: 'Password',
              required: true,
              validators: {
                'maxlength': 20,
                'minlength': 4,
                'ng-pattern': /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])/
              },
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                },
                {
                  type: 'pattern',
                  message: 'Must contain one lower &amp; uppercase letter, and one non-alpha character (a number or a symbol.)'
                },
                {
                  type: 'minlength',
                  message: 'Passwords must be more than 4 characters'
                },
                {
                  type: 'maxlength',
                  message: 'Passwords must be less than 20 characters'
                }
              ]
            }
          ],
          action: {
            submit: {
              name: 'Sign Up',
              classes: "md-warn md-raised"
            }
          }
        }
      ).then(function(data){
        if(!registerUser(data) || !checkUserExist(data)) {
          signUp(ev);
        }
      });
		}

    function forget(ev) {
      CommonService.formDialog(
        ev,
        {
          title: 'Forgot password?',
          items: [
            {
              type:'input',
              subtype: 'email',
              name: 'email',
              label: 'Email',
              required: true,
              validators: {
                'ng-pattern': /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/
              },
              errors: [
                {
                  type: 'required',
                  message: 'This is required.'
                },
                {
                  type: 'pattern',
                  message: 'This is not valid.'
                }
              ]
            }
          ],
          action: {
            submit: {
              name: 'Log In',
              classes: "md-warn md-raised"
            }
          }
        }
      ).then(function(data){
        var password = rememberPassword(data.email);
        if(password) {
          toastr.info(password, 'Your password!');
        } else {
          forget(ev);
          toastr.error('User not found', 'Forget');
        }
      });
    }
	}
})();
