// This is our nodeServer which will handle socket connections

// const io = require('socket.io')(8000);
const io = require('socket.io')(8000, {cors: {origin: "*"}});
const users = {};

io.on('connection', socket => {
    //if any user joins let other users connected to server know

    socket.on('new-user-joined', name => {
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone sends a message broadcast it to other people
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    //if someone leaves the chat let other knows
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });



});
