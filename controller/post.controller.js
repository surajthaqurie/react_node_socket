const { prisma } = require("../db.connection");

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();

  return res.status(200).json({
    success: true,
    message: "Posts fetched successfully",
    data: posts,
  });
};

exports.getPostDetails = async (req, res) => {
  const postId = req.params.id;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      Comment: true,
      User: true,
    },
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post record not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Post details fetched successfully",
    data: post,
  });
};
