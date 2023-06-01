const { Server } = require("socket.io");
const { addCommentWithSocket } = require("./controller/comment.controller");

const socketIOInit = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  addCommentWithSocket(io);
};

module.exports = socketIOInit;

// Socket middleware
