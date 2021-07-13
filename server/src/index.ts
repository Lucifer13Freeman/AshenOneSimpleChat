const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./routes/router');
const cors = require('cors');
import { Socket } from "socket.io";
const { add_user, 
        remove_user, 
        get_user, 
        get_users_in_room } = require('./services/user.service');


const PORT = process.env.PORT || 5000;

const cors_options = {
    cors: true,
    origins:["http://localhost:3000"]
};

const app = express();
const server = http.createServer(app);
const io = socketio(server, cors_options);

app.use(cors());
app.use(router);

io.on('connection', (socket: Socket) => 
{
    //console.log('We have a new connection!');

    socket.on('join', ({ name, room }, callback) => 
    {
        const { error, user } = add_user({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', 
                    { user: 'Admin', 
                    text: `${user.name}, welcome to the room ${user.room}!`});

        socket.broadcast.to(user.room).emit('message', 
                                            { user: 'Admin', 
                                            text: `${user.name} has joined!`});

        io.to(user.room).emit('room_data', 
                                { room: user.room, 
                                user: get_users_in_room(user.room) });

        callback();
    });

    socket.on('send_message', (message, callback) => 
    {
        const user = get_user(socket.id);

        io.to(user.room).emit('message', 
                                { user: user.name, 
                                text: message });                     

        callback();
    });

    socket.on('socket_disconnect', () =>
    {
        const user = remove_user(socket.id);

        if (user)
        {
            io.to(user.room).emit('message', 
                                    { user: 'Admin', 
                                    text: `${user.name} has left...`});
            
            io.to(user.room).emit('room_data', 
                                    { room: user.room, 
                                    user: get_users_in_room(user.room) });
        }
    });
});

const start = () => {

    try
    {
        server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));
    }
    catch (e)
    {
        console.log(e);
    }
}

start();