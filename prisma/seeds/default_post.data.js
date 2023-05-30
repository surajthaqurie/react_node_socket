const { prisma } = require("../../db.connection");

exports.default_posts = async () => {
  const post_data = [
    {
      id: "65b55519-3d06-4fe8-a9ea-cac63474cf57",
      title: "Post 1",
      content:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
      published: true,
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
    },
    {
      id: "65b55519-3d06-4fe8-a9ea-cac63474cf52",
      title: "Post 2",
      content:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
      published: true,
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf58",
    },
    {
      id: "65b55519-3d06-4fe8-a9ea-cac63474cf51",
      title: "Post 3",
      content:
        "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
      published: true,
      user_id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
    },
  ];

  let post = await prisma.post.findMany();
  if (post.length) {
    await prisma.post.deleteMany();
  }

  post = await prisma.post.createMany({
    data: post_data,
  });

  if (!post) {
    console.log("Unable to migrate default post data !!");
    return;
  }

  console.log("Successfully to migrate default post data !!");
};
