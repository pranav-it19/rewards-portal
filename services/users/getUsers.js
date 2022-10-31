import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";

const getUsers = async (req, res) => {

    const { userEmail } = req.params;


    try {

        if (userEmail) {
            const userData = await Prisma.users.findUnique({
                where: {
                    email: userEmail
                },
                include: {
                    mentionedPosts: true
                }
            });

            return res.status(200).json(userData);
        }

        const users = await Prisma.users.findMany();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(502).json(responses.internalServerError);
    }
};

export default getUsers;