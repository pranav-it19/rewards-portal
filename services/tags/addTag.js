import Prisma from "../../prisma/prisma.js";

const addTag = async (name,id) => {

    try {
        const tag = await Prisma.tags.create({
            data: {
                name,
                id:id,
            }
        });
        console.log("SUCCESSFULLY ADDED TAG:", name);

    } catch (error) {
        console.log(`ERROR WHILE ADDING TAG: ${name}`, error);
    }
};

const tags = [
    "Walking Encyclopedia Award",
    "Duct Tape Award",
    "Office DJ Award",
    "Social Director Award",
    "Always In a Meeting Award"
];

tags.map(async (tag) => await addTag(tag));
addTag("Birthday","#birthday")
addTag(
  "Anniversary",
  "#anniversary"
);
