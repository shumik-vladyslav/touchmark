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
			},
			{
				title: 'UI Kit',
				link: 'main.uikit'
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
				header: 'Learn More',
				menus: [
					{
						title: 'Tour',
						link: 'main.home'
					},
					{
						title: 'Customers',
						link: 'main.home'
					},
					{
						title: 'New Features',
						link: 'main.home'
					},
					{
						title: 'Education',
						link: 'main.home'
					}
				]
			},
			{
				header: 'About',
				menus: [
					{
						title: 'Company',
						link: 'main.home'
					},
					{
						title: 'Media Kit',
						link: 'main.home'
					},
					{
						title: 'Jobs',
						link: 'main.home'
					},
					{
						title: 'Blog',
						link: 'main.home'
					}
				]
			},
			{
				header: 'Support',
				menus: [
					{
						title: 'Help Center',
						link: 'main.home'
					},
					{
						title: 'Schedule a Demo',
						link: 'main.home'
					},
					{
						title: 'Terms of Service',
						link: 'main.home'
					},
					{
						title: 'Securety',
						link: 'main.home'
					},
					{
						title: 'Privacy Policy',
						link: 'main.home'
					}
				]
			},
			{
				header: 'Extras',
				menus: [
					{
						title: 'Marketplace',
						link: 'main.home'
					},
					{
						title: 'Design Disruptors',
						link: 'main.home'
					},
					{
						title: 'Sync (Mac)',
						link: 'main.home'
					},
					{
						title: 'Free T-Shirt',
						link: 'main.home'
					}
				]
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