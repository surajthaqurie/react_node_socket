const { prisma } = require("../../db.connection");

exports.default_comments = async () => {
  const comment_data = [
    {
      id: "67b55519-3d06-4fe8-a9ea-cac63474cf57",
      content: "comment 1",
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
      post_id: "65b55519-3d06-4fe8-a9ea-cac63474cf57",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "67b55519-3d06-4fe8-a9ea-cac63474cf51",
      content: "comment 2",
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf58",
      post_id: "65b55519-3d06-4fe8-a9ea-cac63474cf57",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  let comment = await prisma.comment.findMany();
  if (comment.length) {
    await prisma.comment.deleteMany();
  }

  comment = await prisma.comment.createMany({
    data: comment_data,
  });

  if (!comment) {
    console.log("Unable to migrate default comment data !!");
    return;
  }

  console.log("Successfully to migrate default comment data !!");
};
