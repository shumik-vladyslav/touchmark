(function() {
	'use strict';

	angular
		.module('app')
		.controller('FiltersController', FiltersController);

	/** @ngInject */
	function FiltersController($scope) {
        // вместо window надо использовать $window подключив в DI
        var _ = window._;
        // если не используешь $on, $emit, $broadcast, $watch то не надо подключать $scope, вместо него используй vm
        $scope.searchValue = '';
        
        $scope.orderby = orderby;
        
        $scope.search = search;
        // луше создай функцию activate и добавь этот цикл внутр него и здесь вызивай
        for (var key in $scope.settings) {
            if ($scope.settings.hasOwnProperty(key)) {
                var element = $scope.settings[key];
                if(element.functionType === 'orderbyDate'){
                    $scope.orderby(element.scope, element.scope[element.showValue], element.showParam, element.showValue, element.keyGlobalData, element.keyData, false, element.functionType, element.defaultParam);
                }
            }
        }
        
	    function search(update) {
            if(!update){
                $scope.settings[0].scope[$scope.settings[0].keyData] = $scope.settings[0].scope[$scope.settings[0].keyGlobalData];
                for (var key in $scope.settings) {
                    if ($scope.settings.hasOwnProperty(key)) {
                        var element = $scope.settings[key];
                        if(element.scope[element.showValue] !== element.defaultParam){
                            var showValue = element.functionType === 'orderbyCollaborator' ? element.itemValue : element.scope[element.showValue];
                            
                            orderby(element.scope, showValue, element.scope[element.showValue], element.showValue, element.keyGlobalData, element.keyData, false, element.functionType, element.defaultParam);
                        }
                    }
                }
                
            }
            
            $scope.settings[0].scope[$scope.settings[0].keyData] = _.filter($scope.settings[0].scope[$scope.settings[0].keyData], function(o) { 
                var name = o.name.toLowerCase();
                var value = $scope.searchValue.toLowerCase();
                var index = name.indexOf(value);
                
                return ~index; 
                });
                
        }
        
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
            
            search(true);
            
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