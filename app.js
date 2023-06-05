const express = require("express");
const cors = require("cors");
const appRoute = require("./routes");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));

appRoute(app);

module.exports = app;
