/*
  Warnings:

  - You are about to drop the column `likedUserEmails` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `likedUserEmail` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_likedUserEmails_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "likedUserEmails",
ADD COLUMN     "likedUserEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_likedUserEmail_fkey" FOREIGN KEY ("likedUserEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
