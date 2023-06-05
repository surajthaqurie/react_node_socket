const { prisma } = require("../db.connection");

exports.addTIcketCommentIO = async (socket) => {
  socket.on("sendComment:new", async (data) => {
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

    socket.emit(post.id + ":comment-receive", comment);
  });
};
