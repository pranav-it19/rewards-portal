/*
  Warnings:

  - You are about to drop the column `likedUserEmails` on the `Posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_likedUserEmails_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "likedUserEmails";

-- CreateTable
CREATE TABLE "_like" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_like_AB_unique" ON "_like"("A", "B");

-- CreateIndex
CREATE INDEX "_like_B_index" ON "_like"("B");

-- AddForeignKey
ALTER TABLE "_like" ADD CONSTRAINT "_like_A_fkey" FOREIGN KEY ("A") REFERENCES "Posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_like" ADD CONSTRAINT "_like_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
