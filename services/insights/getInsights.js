import Prisma from "../../prisma/prisma.js";
import getAnniversaryPersons from "../functions/getAnniversaries.js";
import getBirthdayPersons from "../functions/getBirthdays.js";

const getInsights = async(req, res) => {
    const birthdays =await getBirthdays();
    const anniversaries = await getAnniversaries();
    res.send({
        birthdays: birthdays,
        anniversaries:anniversaries,
    })

}
const getBirthdays = async (res) => {
    try {
       return await getBirthdayPersons()
    } catch (e)
    {   console.log(e)
        res.status(500).json()
    }
}

const getAnniversaries = async () => {
      try {
        return await getAnniversaryPersons()
      } catch (e) {
        console.log(e);
        res.status(500).json();
      }
}
export default getInsights