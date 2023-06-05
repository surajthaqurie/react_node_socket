const { prisma } = require("../db.connection");
const { writeFile, open } = require("fs");
const path = require("path");
const { generateRandomFileName } = require("../utils");

exports.addTIcketCommentIO = async (socket, io) => {
  let filePath = "";

  socket.on("sendComment:new", async (data) => {
    if (Object.keys(data.file).length) {
      const dir = path.resolve(__dirname, `../public`);
      filePath = dir + "/" + generateRandomFileName(data.file.fileName);
      file = writeFile(filePath, data.file.file, (err) => {
        if (err) {
          console.log("im here error-----------");
        }
        console.log("The file was saved!");
      });
    }
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
        ...(filePath && { file: "/public" + filePath.split("public")[1] }),
      },
      include: { User: true },
    });

    if (!comment) {
      // Error Handling
      console.log("Unable to add comment");
    }

    io.emit(post.id + ":comment-receive", comment);
  });
};
