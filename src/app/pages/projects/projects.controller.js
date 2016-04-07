(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);
    
    var _ = window._;
    
    
    var type = ['ALL TYPES',
                'Desktop(web)', 
                'Mobile devices', 
                'iPhone', 'iPad', 
                'Android Phone', 
                'Android Tabled',
                'Apple Watch', 
                'Android Watch'];
                
     var date = [{value: 'Recent', param: 'update'},
                 {value: 'Alphanumeric', param: 'name'}];
     
     var collaborators = ['ALL COLLABORATORS'];
      
  /** @ngInject */
  function ProjectsController(ProjectsService) {
     var vm = this;
     this.collaboratorsValue = 'ALL COLLABORATORS';
     this.dateValue = 'Recent';
     this.typeValue = 'ALL TYPES';
     this.searchValue = '';
     collaborators = _.concat(collaborators, ProjectsService.getUniqueСollaborators());
     this.collaborators = collaborators;
     this.date = date;
     this.type = type;
     this.projects = ProjectsService.getProjects();
     this.data = ProjectsService.getProjects();
     this.addProjectModal = ProjectsService.addProjectModal;
    //  this.orderbyDate = orderbyDate;
    //  this.orderbyType = orderbyType;
    //  this.orderbyCollaborator = orderbyCollaborator;
    this.orderby = orderby;
     this.search = search;
     this.refreshData = refreshData;
  
     function refreshData() {
        vm.projects = ProjectsService.getProjects();
     }
  
   
    
   
     this.arrSetti =  [
        {
            scope: vm,
            itemValue: 'value',
            itemParam: 'param',
            showValue: 'dateValue',
            keyGlobalData: 'data',
            keyData: 'projects',
            firstFlag: false,
            repeatOption: 'date',
            functionType: 'orderbyDate',
            defaultParam: 'Recent'
        },
        {
            scope: vm,
            itemValue: '',
            itemParam: '',
            showValue: 'typeValue',
            keyGlobalData: 'data',
            keyData: 'projects',
            firstFlag: true,
            repeatOption: 'type',
            functionType: 'orderbyType',
            defaultParam: 'ALL TYPES'
        },
         {
            scope: vm,
            itemValue: '',
            itemParam: '',
            showValue: 'collaboratorsValue',
            keyGlobalData: 'data',
            keyData: 'projects',
            firstFlag: true,
            repeatOption: 'collaborators',
            functionType: 'orderbyCollaborator',
            defaultParam: 'ALL COLLABORATORS'
        },
       
    ];
     function search(update) {
        if(!update){
            vm.projects = vm.data;
            for (var key in vm.arrSetti) {
                if (vm.arrSetti.hasOwnProperty(key)) {
                    var element = vm.arrSetti[key];
                    if(element.scope[element.showValue] !== element.defaultParam){
                        
                        orderby(element.scope, element.scope[element.showValue], element.scope[element.showValue], element.showValue, element.keyGlobalData, element.keyData, false, element.functionType, element.defaultParam);
                    }
                }
            }
            
        }
        
        vm.projects = _.filter(vm.projects, function(o) { 
            var name = o.name.toLowerCase();
            var value = vm.searchValue.toLowerCase();
            var index = name.indexOf(value);
            
            return ~index; 
            });
            
    }
    
    function orderby(self, value, param, dataValue, dataGlobal, data, first, functionType, defaultParam) {
        console.log(self, value, param, dataValue, dataGlobal, data, first, functionType, defaultParam)
        
        self[dataValue] = param;
        if(param === defaultParam || first){
            
            self[data] = self[dataGlobal];
            
            for (var key in vm.arrSetti) {
                if (vm.arrSetti.hasOwnProperty(key)) {
                    var element = vm.arrSetti[key];
                    
                    if(defaultParam === element.defaultParam){
                        continue;
                    }
                    
                     if(self[element.showValue] !== element.defaultParam || first && functionType !== "orderbyDate"){
                         
                        orderby(self, self[element.showValue], self[element.showValue], element.showValue, dataGlobal, data, false, element.functionType, element.defaultParam);
                    }
                }
            }
            
            if(param === defaultParam || !first){
                
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
                        
                        var index = _.indexOf(elementSort.collaborators, param);
                        
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
    
    //  function orderbyDate(self, value, param, dataValue, dataGlobal, data) {
    //     self[dataValue] = value;
        
    //     self[data] = _.sortBy(self[data], function(o) { return o[param]; });
        
    //     self[dataGlobal] = self[data];
    // }
    
    // function orderbyType(self, value, param, dataValue, dataGlobal, data, first) {
    //     console.log(self, value, param, dataValue, dataGlobal, data)
        
    //     self[dataValue] = param;
        
    //     if(param === 'ALL TYPES' || first){
    //         self[data] = self[dataGlobal];
            
    //         if(self.collaboratorsValue !== 'ALL COLLABORATORS' || first){
    //             orderbyCollaborator(self, self['collaboratorsValue'], self['collaboratorsValue'], 'collaboratorsValue', dataGlobal, data, false);
    //         }
    //         if(!first){
    //             return;
    //         }
    //     }
        
    //     search(true);
        
        
        
    //     self[data] = _.filter(self[data], function(o) { return o.type === param; });
    // }
    
    // function orderbyCollaborator(self, value, param, dataValue, dataGlobal, data, first) {
    //     var arr = [];
    //     self[dataValue] = param;
        
    //     if(param === 'ALL COLLABORATORS' || first){
    //         self[data] = self[dataGlobal];
            
    //         if(self.typeValue !== 'ALL TYPES' || first){
    //             orderbyType(self, self['typeValue'], self['typeValue'], 'typeValue', dataGlobal, data, false);
    //         }
    //         if(!first){
    //             return;
    //         }
    //     }
        
    //     search(true);
        
        
        
    //     for (var key in self[data]) {
    //         if (self[data].hasOwnProperty(key)) {
    //             var element = self[data][key];
                
    //             var index = _.indexOf(element.collaborators, param);
                
    //             if(~index){
    //                 arr.push(element);
    //             }
    //         }
    //     }
        
    //     self[data] = arr;
        
    // }
   
  
  }
   
   
})();
