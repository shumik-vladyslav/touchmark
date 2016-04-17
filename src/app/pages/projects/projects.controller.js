(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);
                
     var date = [{value: 'Recent', param: 'update'},
                 {value: 'Alphanumeric', param: 'name'}];
     
     var collaborators = ['ALL COLLABORATORS'];
      
    var type = ['All types','Desktop(web)','Mobile devices','iPhone','iPad','Android Phone','Android Tablet','Apple Watch','Android Watch'];
  /** @ngInject */
  function ProjectsController(ProjectsService, BottomSheetService, $window) {
    var vm = this;
    vm.types = ProjectsService.getTypes();
    vm.add = {
        title: 'Add Project',
        click: ProjectsService.addProjectModal
    };
    vm.settings = {
        add: {
            title: 'Add Project',
            click: ProjectsService.addProjectModal
        },
        items: [
            {
                name: 'orderBy',
                value: '',
                items: [
                    {
                        name: 'update',
                        value: 'Recent'
                    },
                    {
                        name: 'name',
                        value: 'Alphanumeric'
                    }
                ]
            },
            {
                name: 'filter',
                value: '',
                items: [
                    {
                        name: 'update',
                        value: 'Recent'
                    },
                    {
                        name: 'name',
                        value: 'Alphanumeric'
                    }
                ]
            }
        ]
    };
     var _ = $window._;
     vm.collaboratorsValue = 'ALL COLLABORATORS'; // this уже в переменной vm, используй его
     vm.dateValue = 'Recent';
     vm.typeValue = 'ALL TYPES';
     collaborators = _.concat(collaborators, ProjectsService.getUniqueСollaborators());
     vm.collaborators = collaborators;
     vm.date = date;
     vm.type = type;
     vm.projects = ProjectsService.getProjects();
     vm.data = ProjectsService.getProjects();
     // this.addProjectModal = ProjectsService.addProjectModal;
     vm.refreshData = refreshData; // зачем это нужно?
  
     function refreshData() { // зачем это нужно?
        vm.projects = ProjectsService.getProjects();
     }
  
     vm.arrSetti =  [ // зачем она здесь, а не в сервисе
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
            showParam: 'update'
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
        }
    ];
  }
})();
