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

//Socket events
io.sockets.on('connection', newConection);

// Connections
function newConection(socket) {
    console.log('new connection' + socket.id);

    // Receive Img data from Client
    socket.on('dropped_img', gotImg);

    function gotImg(data) {
        socket.broadcast.emit('img_from_server', data);
        //io.sockets.emit('img',data)
        //console.log(data)

    }

};

var server = http.listen(8000, function() {

    console.log("I am listening on port 8000")
})
console.log('server running');
