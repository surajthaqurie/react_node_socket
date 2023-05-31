const express = require("express");
const cors = require("cors");
const appRoute = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

appRoute(app);

module.exports = app;
