const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();

const server = http.createServer(app);

//initiate socket.io and attch this to the http server
const io = socketIo(server);

app.use(express.static("public"));

const users = new Set();

io.on("connection", (socket) => {
  console.log("A user is now connected");

  //handle users when they will join the chat
  socket.on("join", (userName) => {
    users.add(userName);
    socket.userName = userName;

    //broadcast to all clients/users that a new user has joined
    io.emit("userJoined", userName);

    //Send the updated user list to all clients
    io.emit("userList", Array.from(users));
  });
  //handle incoming chat messages

  //handle user when they will leave the chat
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
