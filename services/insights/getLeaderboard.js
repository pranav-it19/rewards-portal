import Prisma from "../../prisma/prisma.js"
import responses from "../../utils/responses.js";

const getLeaderBoard = async (req, res) => {
    try {
        const leaderBoard = await Prisma.users.findMany({
            select: {
                points: true,email:true,name:true
            },
            orderBy: {
                points:'desc'
            }
            
        });
        res.send(leaderBoard)
    }
    catch (e)
    {
        res.status(500).json(responses.internalServerError)
    }
}

export default getLeaderBoard;