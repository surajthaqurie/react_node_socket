const { prisma } = require("../db.connection");
const { setData, hSetData } = require("../redis");

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
      Comment: {
        include: {
          User: true,
        },
      },
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

exports.addPost = async (req, res) => {
  const post = await prisma.post.create({ data: req.body });

  if (!post) {
    return res.status(400).json({
      success: false,
      message: "Unable to create post !!",
    });
  }

  setData(post.id, post);
  hSetData("posts", post.id, post);

  return res.status(200).json({
    success: true,
    message: "Post created successfully !!",
    data: post,
  });
};
