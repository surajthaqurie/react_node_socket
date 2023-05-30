const postRoute = require("./post.route");

const appRoute = (app) => {
  app.use("/api/v1", postRoute);
};

module.exports = appRoute;
