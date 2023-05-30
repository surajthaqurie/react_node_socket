const { getPosts, getPostDetails } = require("../controller/post.controller");

const postRoute = require("express").Router();

postRoute.route("/post").get(getPosts);
postRoute.route("/post/:id").get(getPostDetails);

module.exports = postRoute;
