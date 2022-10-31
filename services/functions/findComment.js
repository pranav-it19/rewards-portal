import Prisma from "../../prisma/prisma.js";

const findComment = async (id) => {
    try {
        return await Prisma.comments.findUnique({
            where: {
                id
            }
        });
    } catch (error) {
        console.log(`ERROR WHILE FETCHING COMMENT:${id}`, error);
    }
};

export default findComment;