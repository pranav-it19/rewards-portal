import Prisma from "../../prisma/prisma.js";
const createPost = async (tag, message, authorEmail, mentionedUserEmail, imageURL) => {
  await Prisma.posts.create({
    data: {
      tagId: tag,
      message,
      authorEmail,
      mentionedUserEmail,
      imageURL
    },
  });
};

export default createPost;