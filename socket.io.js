const { Server } = require("socket.io");
const { addCommentWithSocket } = require("./controller/comment.controller");

const socketIOInit = (server) => {
  const io = new Server(server, {
    transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  addCommentWithSocket(io);
};

module.exports = socketIOInit;

// Socket middleware
