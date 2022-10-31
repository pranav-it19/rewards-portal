/*
  Warnings:

  - You are about to drop the column `commentId` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_commentId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "commentId";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
