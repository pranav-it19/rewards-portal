import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";

const getPosts = async (req, res) => {

    const { postId } = req.params;

    if (postId) {
        try {
            const posts = await Prisma.posts.findUnique({
                where: {
                    id: postId
                },
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    },
                    mentionedUser: {
                        select: {
                            name: true
                        }
                    },
                    likes: true,
                    comments: true
                }
            });
            res.status(200).json(posts);
        } catch (error) {
            console.log(`ERROR WHILE FETCHING POSTS FOR USER:${mentionedUserEmail}`, error);
            res.status(500).json(responses.internalServerError);
        }
        return;
    }

    try {
        const posts = await Prisma.posts.findMany({
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                mentionedUser: {
                    select: {
                        name: true
                    }
                },
                likes: true,
                comments: true
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        console.log(`ERROR WHILE FETCHING POSTS`, error);
        res.status(500).json(responses.internalServerError);
    }
};

export default getPosts;