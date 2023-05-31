const { addComment } = require("../controller/comment.controller");

const commentRoute = require("express").Router();

commentRoute.route("/comment/:postId").post(addComment);

module.exports = commentRoute;
