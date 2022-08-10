const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        console.log(`Joining room: ${data} with id ${socket.id}`);
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        console.log(`Message received: ${data.author} with id ${socket.id} says ${data.message} at ${data.time}`);
        // io.to(data.room).emit("receive_message", data);
        socket.to(data.room).emit("receive_message", data);
    });

    io.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});



server.listen(3001, () => {
    console.log('Server is running on port 3001');
});

