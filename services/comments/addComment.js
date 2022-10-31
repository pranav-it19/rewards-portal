import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";

const addComment = async (req, res) => {

    const { userEmail } = req.user;
    const { postId } = req.params;
    const { message } = req.body;

    if (!message)
        return res.status(400).json(responses.invalidRequestBody);

    try {

        await Prisma.comments.create({
            data: {
                authorEmail: userEmail,
                message,
                postId
            }
        });

        res.status(200).json(responses.commentAdded);

    } catch (error) {
        console.log(error);
        res.status(502).json(responses.internalServerError);
    }

};

export default addComment;