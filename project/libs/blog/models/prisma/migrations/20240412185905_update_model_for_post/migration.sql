/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type_post" TEXT NOT NULL,
    "announcement_public" TEXT,
    "text_public" TEXT,
    "video_url" TEXT,
    "image_url" TEXT,
    "text_quote" TEXT,
    "quote_author" TEXT,
    "link" TEXT,
    "link_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "is_repost" BOOLEAN DEFAULT false,
    "original_post_Id" TEXT,
    "user_id" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
