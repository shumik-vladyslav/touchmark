(function() {
  'use strict';

  angular
    .module('app')
    .controller('PricingController', PricingController);


  /** @ngInject */
  function PricingController() {
    this.pricings = [
      {title: 'Free', quantity: '1 project', price: '0', height: '60%' },  
      {title: 'Starter', quantity: '3 project', price: '10', height: '64%'  },  
      {title: 'Professional', quantity: '10 project', price: '25', height: '70%', top: 'MOST POPULAR'  },  
      {title: 'Team', quantity: '30 project', price: '50', height: '64%'  },  
      {title: 'Enterptise', quantity: 'Unlimited', price: '99', height: '60%'  },  
    ];
  }
})();
