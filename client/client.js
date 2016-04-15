var app = angular.module('ticketApp', []);

app.controller('TicketController', ['$http', function($http){
  var vm = this;
  vm.newTicket = {};
  vm.ticketList = [];

  vm.submitTicket = function(){
    // set up boolean values on object for later
    vm.newTicket.editMode = false;
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
  };

  vm.saveTicket = function(){
    console.log(vm.editTicket);
    vm.editTicket.editMode = false;
    $http.put('/update', vm.editTicket).then(function(response){
      console.log('Ticket updated');
      vm.editTicket = {};
      vm.getAllTickets();
    });
  };

  vm.displayDate = function(dateString){
    return Date(dateString);
  }

  vm.getAllTickets();
}]);
