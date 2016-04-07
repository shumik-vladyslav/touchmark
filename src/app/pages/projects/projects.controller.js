(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);
    
    
    // не надо здесь объявлять переменные, перенесы в сервис 
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
     var _ = window._; // используй $window вместо window
     this.collaboratorsValue = 'ALL COLLABORATORS'; // this уже в переменной vm, используй его
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
     this.refreshData = refreshData; // зачем это нужно?
  
     function refreshData() { // зачем это нужно?
        vm.projects = ProjectsService.getProjects();
     }
  
     this.arrSetti =  [ // зачем она здесь, а не в сервисе
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
