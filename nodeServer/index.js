
// For those facing CORS issue when trying to console log the new-user-joined broadcast emit:
const io = require('socket.io')(10000, {
    cors: {
        origin: '*',
    }
});


// node server which will handle Socket.io connection

// const io = require('socket.io')(5000)

const users = {};

io.on('connection', socket => {
    // if any new user joins let othere user connected to the server know!
    socket.on('new-user-joined', name => {
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });
    // if someone sends a message broadcast it to okkkther people

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    //     // if someone leaves the chat let others know
        socket.on('disconnect', message => {
            socket.broadcast.emit('left',users[socket.id])
            delete users[socket.id]
        });

})