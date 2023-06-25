require("dotenv").config();
const http = require("http");
const app = require("./app");
const socketIOInit = require("./socket.io");
const PORT = process.env.PORT || 4000;

const server = http.createServer(app);
socketIOInit(server);

server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}`);
  // redisClient.quit();
});
