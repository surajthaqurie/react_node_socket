const { Server } = require("socket.io");
const { addTIcketCommentIO } = require("./postComment.io");

const socketIOInit = (server) => {
  const io = new Server(server, {
    transports: ["websocket"], // or [ "websocket", "polling" ] (the order matters)
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
    maxHttpBufferSize: 8 * 1024 * 1024, // 8 MB
  });

  io.on("connection", async (socket) => {
    console.log("Client connected:", socket.id);

    await addTIcketCommentIO(socket, io);

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, "Reason:", reason);
    });
  });
};

module.exports = socketIOInit;
