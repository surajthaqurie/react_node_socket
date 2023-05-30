const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 4001;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Server is start on http://localhost:${PORT}`);
});
