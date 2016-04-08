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
     var _ = window._;
     this.collaboratorsValue = 'ALL COLLABORATORS';
     this.dateValue = 'Recent';
     this.typeValue = 'ALL TYPES';
     collaborators = _.concat(collaborators, ProjectsService.getUniqueСollaborators());
     this.collaborators = collaborators;
     this.date = date;
     this.type = type;
     this.projects = ProjectsService.getProjects();
     this.data = ProjectsService.getProjects();
     this.addProjectModal = ProjectsService.addProjectModal;
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
    
  }
   
   
})();
