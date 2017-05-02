var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var chat = {
    start: function() {
        server.listen(8000);
        console.log("servidor socket.io iniciado na porta " + server.address().port);
        io.set("origins", "*:*");

        io.on('connection', (socket) => {
            socket.on('newMessage', (data) => {
                console.log('nova mensagem' + data);
                socket.emit('chatUpdate', data);
                socket.broadcast.emit('chatUpdate', data);
            });
            socket.on('newUser', (user) => {
                socket.user = user;
                users.push(user);
                console.log("newUser: " + user);
                socket.emit('playersUpdate', users);
                socket.broadcast.emit('playersUpdate', users);
                socket.emit('chatUpdate', { 'user': user, 'text': user + ' entrou na sala', 'system': true });
                socket.broadcast.emit('chatUpdate', { 'user': user, 'text': user + ' entrou na sala', 'system': true });
            });
            socket.on('disconnect', () => {
                console.log('disconnected: ' + socket.user);
                let i = users.indexOf(socket.user);
                users.splice(i, 1);
                socket.broadcast.emit('playersUpdate', users);
                socket.broadcast.emit('chatUpdate', { 'user': socket.user, 'text': socket.user + ' saiu da sala', 'system': true });
            });
        });
    }
}

module.exports = chat;