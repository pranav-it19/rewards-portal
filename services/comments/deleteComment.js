import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import findComment from "../functions/findComment.js";

const deleteComment = async (req, res) => {
    const { userEmail } = req.user;
    const { postId, commentId } = req.params;

    try {

        const comment = await findComment(commentId);
        console.log(comment);
        if (!comment || comment.authorEmail !== userEmail)
            return res.status(404).json(responses.commentNotFound);

        await Prisma.comments.delete({
            where: {
                id: commentId
            }
        });

        res.status(200).json(responses.deleted);

    } catch (error) {
        console.log(error);
        res.status(502).json(responses.internalServerError);
    }

};

export default deleteComment;