(function() {
	'use strict';

	angular
		.module('app')
		.factory('NavService', NavService);

	/** @ngInject */
	function NavService(AuthService) {
		var defaultMenu = [
			{
				title: 'Pricing',
				link: 'main.pricing'
			},
			{
				title: 'About Us',
				link: 'main.about'
			},
			{
				title: 'Showcase',
				link: 'main.showcase'
			},
			{
				title: 'Online Support',
				link: 'main.support'
			}
		];

		var authMenu = [
			{
				title: 'My projects',
				link: 'main.projects'
			},
			{
				title: 'Boards',
				link: 'main.boards'
			},
			{
				title: 'Activity',
				link: 'main.activity'
			},
			{
				title: 'People',
				link: 'main.people'
			},
			{
				title: 'Learn',
				link: 'main.learn'
			}
		];

		var footerMenu = [
			{
				title: 'Pricing',
				link: 'main.pricing'
			},
			{
				title: 'About Us',
				link: 'main.about'
			},
			{
				title: 'Contact us',
				link: 'main.contact'
			},
			{
				title: 'Privacy Policy',
				link: 'main.privacy'
			},
			{
				title: 'Terms of use',
				link: 'main.terms'
			}
		];

		var socials = [
			{
				image: '/assets/icons/youtube.svg',
				link: '/',
				label: 'YouTube'
			},
			{
				image: '/assets/icons/fb.svg',
				link: '/',
				label: 'Facebook'
			},
			{
				image: '/assets/icons/linkedin.svg',
				link: '/',
				label: 'LinkedIn'
			},
			{
				image: '/assets/icons/twitter.svg',
				link: '/',
				label: 'Twitter'
			}
		];

		var service = {
			navMenu: navMenu,
			getFooterMenu: getFooterMenu,
			getSocials: getSocials
		};

		return service;

		function navMenu() {
			if(AuthService.isAuthorized()) {
				return authMenu;
			} else {
				return defaultMenu;
			}
		}

		function getFooterMenu() {
			return footerMenu;
		}

		function getSocials() {
			return socials;
		}
	}
})();
