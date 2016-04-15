var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var tickets = require('./routes/ticketRouter');

var app = express();

/////////////////////////////////////////////////
//    ROUTERS
/////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(express.static('server/public'));
app.use('/', tickets);

/////////////////////////////////////////////////
//    DATABASE
/////////////////////////////////////////////////

var MongoDB = mongoose.connect('mongodb://localhost/ticketStore').connnection;

// console.log(MongoDB);
//
// MongoDB.on('error', function (err){
//   console.log('mongodb connection error:', err);
// });
//
// MongoDB.once('open', function(err){
//   console.log('MongoDB connection open.');
// });

/////////////////////////////////////////////////
//    SERVER
/////////////////////////////////////////////////

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Server listening on port ' + port + '...');
});
