var express = require('express');
var path = require('path');
var Ticket = require('../../models/ticketModel');
var router = express.Router();

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.post('/new', function(request, response){
  // console.log(request);
  var newTicket = new Ticket(request.body);
  newTicket.dateCreated = new Date();
  newTicket.dateUpdated = new Date();
  newTicket.save(function(err){
    if (err){
      console.log('Ticket save failed:', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

router.get('/all', function(request, response){
  Ticket.find({}).exec(function(err, tickets){
    if (err){
      console.log('Ticket retrieval failed:', err);
      response.sendStatus(500);
    } else {
      console.log('Tickets retrieved:', tickets);
      response.send(tickets);
    }
  });
});

router.delete('/remove/:id', function(request, response){
  var ticketID = request.params.id;
  Ticket.findOneAndRemove({_id: ticketID}).exec(function(err, ticket){
    if (err){
      console.log("Ticket not found, unable to remove:", err);
      response.sendStatus(500);
    } else {
      console.log("Ticket removed:", ticket);
      response.sendStatus(200);
    }
  });
});

module.exports = router;
