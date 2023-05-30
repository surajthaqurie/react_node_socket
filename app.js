const express = require("express");
const cors = require("cors");
const appRoute = require("./routes");

const app = express();
app.use(cors());

appRoute(app);

module.exports = app;
