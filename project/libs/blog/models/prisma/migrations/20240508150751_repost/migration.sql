/*
  Warnings:

  - You are about to drop the column `image_url` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `reposts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reposts" DROP CONSTRAINT "reposts_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image_url",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "is_repost" BOOLEAN DEFAULT false,
ADD COLUMN     "origin_post_id" TEXT,
ADD COLUMN     "origin_user_id" TEXT DEFAULT '';

-- DropTable
DROP TABLE "reposts";
