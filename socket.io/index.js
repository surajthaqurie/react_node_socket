const { Server } = require("socket.io");
const { addTIcketCommentIO } = require("./ticketComment.io");

const socketIOInit = (server) => {
  const io = new Server(server, {
    transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  addTIcketCommentIO(io);
};

module.exports = socketIOInit;
