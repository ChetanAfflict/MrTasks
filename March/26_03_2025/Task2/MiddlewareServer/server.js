const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

let users = [];

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("getUsers", () => {
        socket.emit("users", users);
    });

    socket.on("getUser", (id) => {
        const user = users.find((u) => u.id === id);
        socket.emit("user", user);
    });

    socket.on("addUser", (user) => {
        user.id = Date.now().toString();
        users.push(user);
        io.emit("users", users);
    });

    socket.on("editUser", (updatedUser) => {
        users = users.map(user => user.id === updatedUser.id ? updatedUser : user);
        io.emit("users", users);
    });

    socket.on("deleteUser", (id) => {
        users = users.filter(user => user.id !== id);
        io.emit("users", users);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
