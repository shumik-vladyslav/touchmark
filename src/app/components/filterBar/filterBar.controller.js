(function() {
	'use strict';

	angular
		.module('app')
		.controller('FilterBarController', FilterBarController);

	/** @ngInject */
	function FilterBarController($scope, $window) { 
        var _ = $window._;
        var vm = this;
        
        vm.orderby = orderby;
        
        function orderby(self, value, param, dataValue, dataGlobal, data, first, functionType, defaultParam) {
            self[dataValue] = param;
            if(param === defaultParam || first){
                
                self[data] = self[dataGlobal];
                
                for (var key in $scope.settings) {
                    if ($scope.settings.hasOwnProperty(key)) {
                        var element = $scope.settings[key];
                        
                        if(defaultParam === element.defaultParam){
                            continue;
                        }
                        
                        if(self[element.showValue] !== element.defaultParam || first && functionType !== 'orderbyDate'){
                            
                            var showValue = element.functionType === 'orderbyCollaborator' ? 
                                                element.itemValue : self[element.showValue];
                        
                            orderby(self, showValue, self[element.showValue], element.showValue, dataGlobal, data, false, element.functionType, element.defaultParam);
                        }
                    }
                }
                
                if((param === defaultParam || !first) && functionType !== 'orderbyDate'){
                    
                    return;
                }
            }
            
            switch (functionType) {
                case 'orderbyType':
                
                    self[data] = _.filter(self[data], function(o) { return o.type === param; });
                    
                    break;
                    
                case 'orderbyDate':
                    self[dataValue] = value;
            
                    self[data] = _.sortBy(self[data], function(o) { return o[param]; });
                    
                    if(self[dataGlobal].length === self[data].length){
                        self[dataGlobal] = self[data];
                    }
                    break;
                    
                case 'orderbyCollaborator':
                var arr = [];
                
                for (var keySort in self[data]) {
                        if (self[data].hasOwnProperty(keySort)) {
                            var elementSort = self[data][keySort];
                            
                            var index = _.indexOf(elementSort[value], param);
                            
                            if(~index){
                                arr.push(elementSort);
                            }
                        }
                    }
                    
                    self[data] = arr;
                
                    break;
                default:
                    break;
            }
        }
        }
})();