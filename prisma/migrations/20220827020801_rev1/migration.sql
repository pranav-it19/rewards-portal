/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `likedUserIds` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `mentionedUserId` on the `Posts` table. All the data in the column will be lost.
  - The primary key for the `Users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorEmail` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorEmail` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `commentId` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentionedUserEmail` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_likedUserIds_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_mentionedUserId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "authorId",
DROP COLUMN "likedUserIds",
DROP COLUMN "mentionedUserId",
ADD COLUMN     "authorEmail" TEXT NOT NULL,
ADD COLUMN     "commentId" TEXT NOT NULL,
ADD COLUMN     "likedUserEmails" TEXT,
ADD COLUMN     "mentionedUserEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Users" DROP CONSTRAINT "Users_pkey",
DROP COLUMN "id",
ADD COLUMN     "email" TEXT NOT NULL,
ALTER COLUMN "points" SET DEFAULT 0,
ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_mentionedUserEmail_fkey" FOREIGN KEY ("mentionedUserEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_likedUserEmails_fkey" FOREIGN KEY ("likedUserEmails") REFERENCES "Users"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "Users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
