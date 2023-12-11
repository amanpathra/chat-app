const socketIO = require('socket.io');

const io = socketIO(8000, {
    cors: {
        origin: "http://192.168.29.205:5500",
        methods: ["GET", "POST"],
        credentials: true
    }
});

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        // console.log(name + " joined.");
        users[socket.id] = name;
        // console.log(users);
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        console.log(socket.id)
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', ()=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
}) 