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
