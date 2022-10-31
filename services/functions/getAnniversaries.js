import Prisma from "../../prisma/prisma.js";

const getAnniversaryPersons = async () => {
  var result = [];
  const anniPersons = await Prisma.users.findMany();
  anniPersons.map((e) => {
    const currentdate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    if (e.doj.getDate() === currentdate && e.doj.getMonth() === currentMonth) {
      result.push(e);
    }
  });
  console.log(anniPersons);
  return result;
};
export default getAnniversaryPersons;
