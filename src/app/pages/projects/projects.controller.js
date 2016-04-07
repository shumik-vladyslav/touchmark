(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);
    
    
    
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
    // this.orderby = orderby;
    //  this.search = search;
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
            defaultParam: 'Recent',
            showParam: 'update',
            
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
            itemValue: 'collaborators',
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
    //  function search(update) {
    //     if(!update){
    //         vm.projects = vm.data;
    //         for (var key in vm.arrSetti) {
    //             if (vm.arrSetti.hasOwnProperty(key)) {
    //                 var element = vm.arrSetti[key];
    //                 if(element.scope[element.showValue] !== element.defaultParam){
    //                     var showValue = element.functionType === 'orderbyCollaborator' ? element.itemValue : element.scope[element.showValue];
                        
    //                     orderby(element.scope, showValue, element.scope[element.showValue], element.showValue, element.keyGlobalData, element.keyData, false, element.functionType, element.defaultParam);
    //                 }
    //             }
    //         }
            
    //     }
        
    //     vm.projects = _.filter(vm.projects, function(o) { 
    //         var name = o.name.toLowerCase();
    //         var value = vm.searchValue.toLowerCase();
    //         var index = name.indexOf(value);
            
    //         return ~index; 
    //         });
            
    // }
    
    // function orderby(self, value, param, dataValue, dataGlobal, data, first, functionType, defaultParam) {
    //     console.log(self, value, param, dataValue, dataGlobal, data, first, functionType, defaultParam)
        
    //     self[dataValue] = param;
    //     if(param === defaultParam || first){
            
    //         self[data] = self[dataGlobal];
            
    //         for (var key in vm.arrSetti) {
    //             if (vm.arrSetti.hasOwnProperty(key)) {
    //                 var element = vm.arrSetti[key];
                    
    //                 if(defaultParam === element.defaultParam){
    //                     continue;
    //                 }
                    
    //                  if(self[element.showValue] !== element.defaultParam || first && functionType !== 'orderbyDate'){
                        
    //                     var showValue = element.functionType === 'orderbyCollaborator' ? element.itemValue : self[element.showValue];
                      
    //                     orderby(self, showValue, self[element.showValue], element.showValue, dataGlobal, data, false, element.functionType, element.defaultParam);
    //                 }
    //             }
    //         }
            
    //         if(param === defaultParam || !first){
                
    //             return;
    //         }
    //     }
        
    //     search(true);
        
    //     switch (functionType) {
    //         case 'orderbyType':
            
    //             self[data] = _.filter(self[data], function(o) { return o.type === param; });
                
    //             break;
                
    //         case 'orderbyDate':
    //             self[dataValue] = value;
        
    //             self[data] = _.sortBy(self[data], function(o) { return o[param]; });
                
    //             if(self[dataGlobal].length === self[data].length){
    //                 self[dataGlobal] = self[data];
    //             }
    //             break;
                
    //         case 'orderbyCollaborator':
    //            var arr = [];
               
    //            for (var keySort in self[data]) {
    //                 if (self[data].hasOwnProperty(keySort)) {
    //                     var elementSort = self[data][keySort];
                        
    //                     var index = _.indexOf(elementSort[value], param);
                        
    //                     if(~index){
    //                         arr.push(elementSort);
    //                     }
    //                 }
    //             }
                
    //             self[data] = arr;
            
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
  }
   
   
})();
