require("dotenv").config();
const http = require("http");
const app = require("./app");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "Reason:", reason);
  });
});

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
});
