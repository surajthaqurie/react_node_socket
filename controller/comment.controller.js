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

    socket.on(socket.id, async (data) => {
      const post = await prisma.post.findUnique({ where: { id: data.postId } });
      // if (!post) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Post record not found",
      //   });
      // }

      comment = await prisma.comment.create({
        data: {
          content: data.content,
          post_id: post.id,
          user_id: data.user_id,
        },
      });

      comment = await prisma.comment.findUnique({
        where: { id: comment.id },
        include: { User: true },
      });
      socket.emit(post.id, comment);

      // if (!comment) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Unable to comment",
      //   });
      // }

      // return res.status(200).json({
      //   success: true,
      //   message: "Comment added successfully",
      //   data: comment,
      // });
    });
    socket.on("disconnect", (reason) => {
      console.log("Client disconnected:", socket.id, "Reason:", reason);
    });
  });
};
