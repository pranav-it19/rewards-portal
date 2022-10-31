import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import findPost from "../functions/findPost.js";

const deletePost = async (req, res) => {
    const { userEmail } = req.user;
    const { postId } = req.params;

    try {
        const postAvailable = await findPost(postId);

        if (!postAvailable || postAvailable.authorEmail !== userEmail)
            return res.status(404).json(responses.postNotFound);

        await Prisma.posts.delete({
            where: {
                id: postId
            }
        });

        res.status(200).json(responses.deleted);


    } catch (error) {
        console.log(error);
        res.status(500).json(responses.internalServerError);
    }

};

export default deletePost;