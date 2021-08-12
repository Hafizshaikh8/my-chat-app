const express=require('express');
const app = express();
const http = require('http');
const server= http.createServer(app);
const{Server}=require('socket.io')

const io = new Server(server);
io.on('connection',(socket)=> {
    console.log('User connected');
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });

    socket.emit('ENTER_NAME');

    socket.on('USERNAME',(username)=>{
        socket.username=username;
        //io.emit('USER_CONNECTED',username + 'connected');
        socket.broadcast.emit("USER_CONNECTED",username  +'connected');
    });

    /*socket.on('message',(data)=>{
        console.log(data);
        io.emit('server_message','hi client')
    })*/
    socket.on('MESSAGE',(data)=>{
        console.log(data);
        socket.broadcast.emit('SERVER_MESSAGE',socket.username + ':' + data);
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});


server.listen(4000,()=>{
    console.log('server is running at http://localhost:4000')
});