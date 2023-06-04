const { Server } = require("socket.io");
const { addTIcketCommentIO } = require("./ticketComment.io");

const socketIOInit = async (server) => {
  const io = new Server(server, {
    transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 8 * 1024 * 1024, // 8 MB
  });

  await addTIcketCommentIO(io);
};

module.exports = socketIOInit;
