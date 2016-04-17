var app = angular.module('ticketApp', []);

app.controller('TicketController', ['$http', function($http){
  var vm = this;
  vm.newTicket = {};
  vm.ticketList = [];

  vm.submitTicket = function(){
    // set up boolean values on object for later
    vm.newTicket.editMode = false;
    vm.newTicket.disableEdit = false;
    $http.post('/new', vm.newTicket).then(function(response){
      console.log('Ticket submitted successfully');
      vm.getAllTickets();
    });
  };

  vm.getAllTickets = function(){
    $http.get('/all').then(function(response){
      console.log('Tickets retrieved:', response);
      vm.ticketList = response.data;
      vm.ticketList.map(function(ticketEntry){
        var displayDateCreated = moment(ticketEntry.dateCreated).format("dddd, MMMM Do YYYY, h:mm:ss a");
        ticketEntry.dateCreatedString = displayDateCreated;
        var displayDateUpdated = moment(ticketEntry.dateUpdated).format("dddd, MMMM Do YYYY, h:mm:ss a");
        ticketEntry.dateUpdatedString = displayDateUpdated;
        //return newDate;
      });
    });
  };

  vm.removeTicket = function(ticketEntry){
    console.log('ticket remove function ran')
    $http.delete('/remove/' + ticketEntry._id).then(function(response){
        console.log('Ticket removed');
        vm.getAllTickets();
    });
  };

  vm.editThisTicket = function(ticketEntry){
    vm.editTicket = ticketEntry;
    vm.editTicket.editMode = true;
    vm.disableEdits();
  };

  vm.saveTicket = function(){
    console.log(vm.editTicket);
    vm.editTicket.editMode = false;
    $http.put('/update', vm.editTicket).then(function(response){
      console.log('Ticket updated');
      vm.enableEdits();
      vm.editTicket = {};
      vm.getAllTickets();
    });
  };

  vm.disableEdits = function(){
    vm.ticketList.map(function(ticketEntry){
      if(!ticketEntry.editMode) {
        ticketEntry.disableEdit = true;
      }
    });
  };

  vm.enableEdits = function(){
    vm.ticketList.map(function(ticketEntry){
      if(ticketEntry.disableEdit){
        ticketEntry.disableEdit = false;
      }
    });
  };

  vm.getAllTickets();
}]);
