(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProjectsController', ProjectsController);
    
    var _ = window._;
    
    var self;
    
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
     self = this;
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
     this.orderbyDate = orderbyDate;
     this.orderbyType = orderbyType;
     this.orderbyCollaborator = orderbyCollaborator;
     this.search = search;
  }
  
  function search(update) {
      if(!update){
          self.projects = self.data;
      }
      
      if(self.collaboratorsValue !== 'ALL COLLABORATORS' && !update){
          orderbyCollaborator(self.collaboratorsValue);
      }
      
      if(self.typeValue !== 'ALL TYPES' && !update){
          orderbyType(self.typeValue);
      }
      
      self.projects = _.filter(self.projects, function(o) { 
          var name = o.name.toLowerCase();
          var value = self.searchValue.toLowerCase();
          var index = name.indexOf(value);
          
          return ~index; 
        });
  }
  
  function orderbyDate(params) {
      self.dateValue = params;
      
      if(params === 'Recent'){
        self.projects = _.sortBy(self.projects, function(o) { return o.update; });
      }
      
      if(params === 'Alphanumeric'){
        self.projects = _.sortBy(self.projects, function(o) { return o.name; });
      }
      
      self.data = self.projects;
   }
  
   function orderbyType(params, first) {
       self.typeValue = params;
       
       if(params === 'ALL TYPES' && self.collaboratorsValue !== 'ALL COLLABORATORS'){
           self.projects = self.data;
           orderbyCollaborator(self.collaboratorsValue, false);
           return;
       }else if(params === 'ALL TYPES'){
           self.projects = self.data;
           return;
       }
       
       if(first){
           self.projects = self.data;
           orderbyCollaborator(self.collaboratorsValue, false);
       }
       
       search(true);
       
       self.projects = _.filter(self.projects, function(o) { return o.type === params; });
   }
  
   function orderbyCollaborator(params, first) {
       self.collaboratorsValue = params;
       var arr = [];
       
       if(self.typeValue !== 'ALL TYPES' && params === 'ALL COLLABORATORS'){
           self.projects = self.data;
           orderbyType(self.typeValue, false);
           return;
       }else if(params === 'ALL COLLABORATORS'){
           self.projects = self.data;
           return;
       }
       
       if(first){
           self.projects = self.data;
           orderbyType(self.typeValue, false);
       }
       
       search(true);
       
       for (var key in self.projects) {
           if (self.projects.hasOwnProperty(key)) {
               var element = self.projects[key];
               
               var index = _.indexOf(element.collaborators, params);
               
               if(~index){
                   arr.push(element);
               }
           }
       }
       
       self.projects = arr;
       
   }
   
})();
