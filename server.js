const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  //   socket.emit("connection", "connected");
  //   console.log(`User is connected with id: ${socket.id}`);
  //   socket.on("client ready", (msg) => {
  //     console.log(msg);
  //   });
  //   socket.on("btn clicked", () => {
  //     console.log("Button clicked");
  //     socket.emit("do something");
  //   });
  socket.on("send_message", (msg) => {
    socket.broadcast.emit("receive_message", msg);
    console.log("msg broadcasted");
  });

  socket.on("user_typing", (data) => {
    socket.broadcast.emit("user_typing", data);
  });
  socket.on("new_user", (data) => {
    socket.broadcast.emit("new_user", data.user);
    console.log("user broadcasted", data.user);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
