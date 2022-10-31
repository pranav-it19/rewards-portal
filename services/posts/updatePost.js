import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import findPost from "../functions/findPost.js";

const updatePost = async (req, res) => {
    const { userEmail } = req.user;
    const { postId } = req.params;
    const { tagId, message, mentionedUserEmail, imageURL } = req.body;

    try {

        const postAvailable = await findPost(postId);

        console.log("Post for postId:", postAvailable);
        console.log("Email", userEmail);

        if (!postAvailable || postAvailable.authorEmail !== userEmail)
            return res.status(404).json(responses.postNotFound);

        await Prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                tagId,
                message,
                mentionedUserEmail,
                imageURL
            }
        });

        res.status(200).json(responses.postUpdated);

    } catch (error) {
        console.log(`ERROR WHILE UPDATING POST:${postId}`, error);
        res.status(502).json(responses.internalServerError);
    }

};

export default updatePost;