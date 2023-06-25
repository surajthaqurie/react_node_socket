const express = require("express");
const cors = require("cors");
const path = require("path");

const appRoute = require("./routes");
const redisClient = require("./redis");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  await redisClient.connect();
})();

app.use("/public", express.static(path.join(__dirname, "public")));

appRoute(app);

module.exports = app;
