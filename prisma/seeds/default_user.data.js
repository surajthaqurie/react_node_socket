const { prisma } = require("../../db.connection");

exports.default_users = async () => {
  const user_data = [
    {
      id: "55b55519-3d06-4fe8-a9ea-cac63474cf57",
      name: "user 1",
      email: "user1@email.com",
      phone: "0000000001",
    },
    {
      id: "55b55519-3d06-4fe8-a9ea-cac63474cf58",
      name: "user 2",
      email: "user2@email.com",
      phone: "0000000002",
    },
    {
      id: "55b55519-3d06-4fe8-a9ea-cac63474cf59",
      name: "user 3",
      email: "user3@email.com",
      phone: "0000000003",
    },
  ];

  let user = await prisma.users.findMany();
  if (user.length) {
    await prisma.users.deleteMany();
  }

  user = await prisma.users.createMany({
    data: user_data,
  });

  if (!user) {
    console.log("Unable to migrate default user data !!");
    return;
  }

  console.log("Successfully to migrate default user data !!");
};
