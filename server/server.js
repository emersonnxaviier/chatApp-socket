//import app from "express";
const app = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["*"],
  },
});

io.on("connection", (socket) => {
  console.log("Server has a new connection...");

  socket.on("chat-message", (data) => {
    // vai ouvir e receber uma mensagem
    console.log("Chat message: ", data);
    io.emit("chat-message", data); // vai pegar a mensagem recebida e emitir novamente para o front-end
  });

  socket.on("disconnect", () => {
    console.log("Socket disconected...");
  });
});

http.listen(4000, function () {
  console.log("Server running...");
});
