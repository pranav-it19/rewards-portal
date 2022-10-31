import Prisma from "../../prisma/prisma.js";
import responses from "../../utils/responses.js";

const getTags = async (req, res) => {

    try {
        const tags = await Prisma.tags.findMany();
        res.status(200).json(tags);
    } catch (error) {
        console.log(error);
        res.status(502).json(responses.internalServerError);
    }
};

export default getTags;