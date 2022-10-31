import Prisma from "../../prisma/prisma.js";

const getBirthdayPersons = async () => {
  const bdayPersons = await Prisma.users.findMany();
  var result = [];
  bdayPersons.map((e) => {
    const currentdate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    if (e.dob.getDate() === currentdate && e.dob.getMonth() === currentMonth) {
      result.push(e);
    }
  });
  console.log(bdayPersons);
  return result;
};
export default getBirthdayPersons;
