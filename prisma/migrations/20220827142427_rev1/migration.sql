/*
  Warnings:

  - You are about to drop the `_like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_like" DROP CONSTRAINT "_like_A_fkey";

-- DropForeignKey
ALTER TABLE "_like" DROP CONSTRAINT "_like_B_fkey";

-- DropTable
DROP TABLE "_like";

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
