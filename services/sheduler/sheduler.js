import nodeCron from "node-cron";
import createPost from "../functions/createPost.js";
import getAnniversaryPersons from "../functions/getAnniversaries.js";
import getBirthdayPersons from "../functions/getBirthdays.js";
import addUser from "../users/addUser.js";

const startSheduler = () => {
  nodeCron.schedule(
    "1 0 * * *",
    () => {
      postBirthdayMessage();
      postAnniversaryWishes();
      addUser();
    },
    {
      scheduled: true,
      timezone: "Asia/Calcutta",
    }
  );
};
const postBirthdayMessage = async () => {
  const bdayPersons = await getBirthdayPersons();
  bdayPersons.map(
    async (e) =>
      await createPost(
        "#birthday",
        "Wishing you a very happy birthday!",
        e.email,
        "hr@grootan.com",
        "https://images.pexels.com/photos/2072149/pexels-photo-2072149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      )
  );

};

const postAnniversaryWishes = async () => {
  const anniPersons = await getAnniversaryPersons();
  anniPersons.map(
    async (e) => {
      console.log("email==>" + e);
      await createPost(
        "#anniversary",
        "Thank you for being such an integral part of Grootan Technologies. This ride has been especially special because you have been a part of it.",
        e.email,
        "hr@grootan.com",
        "https://images.pexels.com/photos/2072175/pexels-photo-2072175.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      );
    }
  );

};

export default startSheduler;
