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
     this.orderbyDate = orderbyDate;
     this.orderbyType = orderbyType;
     this.orderbyCollaborator = orderbyCollaborator;
     this.search = search;
     this.refreshData = refreshData;
     
     function refreshData() {
        vm.projects = ProjectsService.getProjects();
     }
  
    function search(update) {
        if(!update){
            vm.projects = vm.data;
        }
        
        if(vm.collaboratorsValue !== 'ALL COLLABORATORS' && !update){
            orderbyCollaborator(vm.collaboratorsValue);
        }
        
        if(vm.typeValue !== 'ALL TYPES' && !update){
            orderbyType(vm.typeValue);
        }
        
        vm.projects = _.filter(vm.projects, function(o) { 
            var name = o.name.toLowerCase();
            var value = vm.searchValue.toLowerCase();
            var index = name.indexOf(value);
            
            return ~index; 
            });
    }
    
    function orderbyDate(self, value, param, dataValue, dataGlobal, data) {
        self[dataValue] = value;
        
        self[data] = _.sortBy(self[data], function(o) { return o[param]; });
        
        self[dataGlobal] = self[data];
    }
    
    function orderbyType(self, value, param, dataValue, dataGlobal, data, first) {
        self[dataValue] = param;
        
        if(param === 'ALL TYPES' || first){
            self[data] = self[dataGlobal];
            
            if(self.collaboratorsValue !== 'ALL COLLABORATORS' || first){
                orderbyCollaborator(self, self['collaboratorsValue'], self['collaboratorsValue'], 'collaboratorsValue', dataGlobal, data, false);
            }
            if(!first){
                return;
            }
        }
        
        search(true);
        
        
        
        self[data] = _.filter(self[data], function(o) { return o.type === param; });
    }
    
    function orderbyCollaborator(self, value, param, dataValue, dataGlobal, data, first) {
        var arr = [];
        self[dataValue] = param;
        
        if(param === 'ALL COLLABORATORS' || first){
            self[data] = self[dataGlobal];
            
            if(self.typeValue !== 'ALL TYPES' || first){
                orderbyType(self, self['typeValue'], self['typeValue'], 'typeValue', dataGlobal, data, false);
            }
            if(!first){
                return;
            }
        }
        
        search(true);
        
        
        
        for (var key in self[data]) {
            if (self[data].hasOwnProperty(key)) {
                var element = self[data][key];
                
                var index = _.indexOf(element.collaborators, param);
                
                if(~index){
                    arr.push(element);
                }
            }
        }
        
        self[data] = arr;
        
    }
   
  
  }
   
   
})();
