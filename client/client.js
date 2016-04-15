var app = angular.module('ticketApp', []);

app.controller('TicketController', ['$http', function($http){
  var vm = this;
  vm.newTicket = {};
  vm.ticketList = [];

  vm.submitTicket = function(){
    // console.log('submitted');
    $http.post('/new', vm.newTicket).then(function(response){
      console.log('Ticket submitted successfully');
      vm.getAllTickets();
    });
  };

  vm.getAllTickets = function(){
    $http.get('/all').then(function(response){
      console.log('Tickets retrieved:', response);
      vm.ticketList = response.data;
    });
  };

  vm.removeTicket = function(ticketEntry){
    console.log('ticket remove function ran')
    $http.delete('/remove/' + ticketEntry._id).then(function(response){
        console.log('Ticket removed');
        vm.getAllTickets();
    });
  };

  vm.getAllTickets();
}]);
