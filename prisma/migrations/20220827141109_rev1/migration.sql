/*
  Warnings:

  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userEmail_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "likedUserEmails" TEXT;

-- DropTable
DROP TABLE "Likes";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_likedUserEmails_fkey" FOREIGN KEY ("likedUserEmails") REFERENCES "Users"("email") ON DELETE SET NULL ON UPDATE CASCADE;
