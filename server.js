const express = require('express');
const { Server } = require("socket.io");
const http = require('http')
const app = express();
const cors = require('cors')

app.use(cors())
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin:"*",
        methods:["GET", "POST"]
    }
})

//listen to events from FrontEnd;
//when a user connects on out FR -> This immediately starts running
io.on("connection", (socket)=>{
    console.log(`USER CONNECTED: ${socket.id}`)

    socket.on("send_message" , (data) => {
        socket.broadcast.emit("receive_message", data)
    })
})

app.get('/', (req,res)=> {
    res.send("Home of Serve")
})

server.listen(5000,() => {
    console.log("Server on Port 5000" )
})