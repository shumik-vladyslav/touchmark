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
                
     var date = ['Recent', 'Alphanumeric'];
     
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
    
    function orderbyDate(params) {
        vm.dateValue = params;
        
        if(params === 'Recent'){
            vm.projects = _.sortBy(vm.projects, function(o) { return o.update; });
        }
        
        if(params === 'Alphanumeric'){
            vm.projects = _.sortBy(vm.projects, function(o) { return o.name; });
        }
        
        vm.data = vm.projects;
    }
    
    function orderbyType(params, first) {
        vm.typeValue = params;
        
        if(params === 'ALL TYPES' && vm.collaboratorsValue !== 'ALL COLLABORATORS'){
            vm.projects = vm.data;
            orderbyCollaborator(vm.collaboratorsValue, false);
            return;
        }else if(params === 'ALL TYPES'){
            vm.projects = vm.data;
            return;
        }
        
        if(first){
            vm.projects = vm.data;
            orderbyCollaborator(vm.collaboratorsValue, false);
        }
        
        search(true);
        
        vm.projects = _.filter(vm.projects, function(o) { return o.type === params; });
    }
    
    function orderbyCollaborator(params, first) {
        vm.collaboratorsValue = params;
        var arr = [];
        
        if(vm.typeValue !== 'ALL TYPES' && params === 'ALL COLLABORATORS'){
            vm.projects = vm.data;
            orderbyType(vm.typeValue, false);
            return;
        }else if(params === 'ALL COLLABORATORS'){
            vm.projects = vm.data;
            return;
        }
        
        if(first){
            vm.projects = vm.data;
            orderbyType(vm.typeValue, false);
        }
        
        search(true);
        
        for (var key in vm.projects) {
            if (vm.projects.hasOwnProperty(key)) {
                var element = vm.projects[key];
                
                var index = _.indexOf(element.collaborators, params);
                
                if(~index){
                    arr.push(element);
                }
            }
        }
        
        vm.projects = arr;
        
    }
   
  
  }
   
   
})();
