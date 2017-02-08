var express = require('express');
var path = require('path')
var fs = require('fs');


var app = express();

var http = require('http').createServer(app)
//http = http.Server(app)
var io = require('socket.io')(http)

// Hosting static files
app.use(express.static('public'));
// Open Server in port 3000

// Import to server
//var io = socket(app);

var allClients = [];
var clients;

//Socket events
io.sockets.on('connection', function(socket){
  console.log('Got connect!');

  allClients.push(socket);

// Connections

      socket.on('disconnect', function() {
            console.log('Got disconnect!');

            var i = allClients.indexOf(socket);
            allClients.splice(i, 1);
            console.log(clients);

         });

    // Receive Img data from Client
    socket.on('dropped_img', gotImg);

    function gotImg(data) {
        socket.broadcast.emit('img_from_server', data);
        //io.sockets.emit('img',data)
        //console.log(data)
    }

    clients = allClients.length;

  console.log(clients);
        //socket.broadcast.emit('uid_from_server', data);
         io.sockets.emit('uid_from_server', clients);


});



var server = http.listen(8000, function() {
console.log("I am listening on port 8000")
})

console.log('server running');
