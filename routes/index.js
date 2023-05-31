const postRoute = require("./post.route");
const commentRoute = require("./comment.route");

const appRoute = (app) => {
  app.use("/api/v1", postRoute);
  app.use("/api/v1", commentRoute);
};

module.exports = appRoute;
