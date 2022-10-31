import Prisma from "../../prisma/prisma.js";

const findPost = async (postId) => {
    try {
        const post = await Prisma.posts.findUnique({
            where: {
                id: postId
            }
        });
        return post;
    } catch (error) {
        console.log(`ERROR WHILE FINDING POST:${postId}`, error);
    }
};

export default findPost;