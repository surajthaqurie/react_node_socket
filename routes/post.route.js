const {
  getPosts,
  getPostDetails,
  addPost,
} = require("../controller/post.controller");

const postRoute = require("express").Router();

postRoute.route("/post").get(getPosts).post(addPost);
postRoute.route("/post/:id").get(getPostDetails);

module.exports = postRoute;
