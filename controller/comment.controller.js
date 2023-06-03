const { prisma } = require("../db.connection");

exports.addComment = async (req, res) => {
  const postId = req.params.postId;

  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post record not found",
    });
  }

  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      post_id: postId,
      user_id: req.body.user_id,
    },
  });

  if (!comment) {
    return res.status(400).json({
      success: false,
      message: "Unable to comment",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Comment added successfully",
    data: comment,
  });
};

exports.addCommentWithSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // socket.emit("comments", comments);

    socket.on("sendComment:new", async (data) => {
      console.log(data);
      const post = await prisma.post.findUnique({ where: { id: data.postId } });

      if (!post) {
        // Error Handling
        console.log("Post record not found");
      }

      const comment = await prisma.comment.create({
        data: {
          content: data.content,
          post_id: post.id,
          user_id: data.user_id,
        },
        include: { User: true },
      });

      if (!comment) {
        // Error Handling
        console.log("Unable to add comment");
      }

      // comments.push(comment);
      io.emit(post.id + ":comment-receive", comment);
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, "Reason:", reason);
    });
  });
};
