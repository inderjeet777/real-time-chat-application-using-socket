//setting up express environment
var app = require('express')();
var http = require('http').Server(app);

//setting socket environment
var io = require('socket.io')(http);

//file to run on getting a new request
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//code run when server connects to it on connection
io.on('connection', function(socket){
    console.log('user connected');

    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

//to let server listen on port 3000
http.listen(3000, function(){
    console.log('listening on *:3000');
});