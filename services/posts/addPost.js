import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";
import createPost from "../functions/createPost.js";

const addPost = async (req, res) => {

    const { userEmail } = req.user;

    const { tagId, message, mentionedUserEmail, imageURL } = req.body;
    if (!tagId || !message || !mentionedUserEmail) {
        return res.status(400).json(responses.invalidRequestBody);
    }

    try {
        await createPost(tagId, message, userEmail, mentionedUserEmail, imageURL);
        await Prisma.users.update({
            where: {
                email: userEmail
            },
            data: {
                points: {
                    increment: 5
                }
            }
        });

        res.status(201).json(responses.created);
    } catch (error) {
        console.log(`ERROR WHILE CREATING POST FOR USER: ${userEmail} - ERROR:`, error);
        res.status(500).json(responses.internalServerError);
    }
};

export default addPost;