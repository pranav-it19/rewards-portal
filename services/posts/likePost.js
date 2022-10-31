import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import findPost from "../functions/findPost.js";

const likePost = async (req, res) => {
    const { postId } = req.params;
    const { isliked } = req.query;
    const { userEmail } = req.user;

    try {
        console.log(userEmail);
        const postAvailable = await findPost(postId);

        if (!postAvailable)
            return res.status(404).json(responses.postNotFound);

        const like = await Prisma.likes.findFirst({
            where: {
                postId,
                userEmail
            }
        });

        console.log(like);

        if (like === null) {
            await Prisma.likes.create({
                data: {
                    userEmail,
                    postId
                }
            });

            return res.status(200).json({
                status: "OK",
                message: "Like added"
            });

        }

        await Prisma.likes.delete({
            where: {
                id: like.id
            }
        });

        res.status(200).json({
            status: "OK",
            message: "Like deleted"
        });

    } catch (error) {

        console.log(error);
    }

};

export default likePost;