-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "typePost" TEXT NOT NULL,
    "announcementPublic" TEXT,
    "textPublic" TEXT,
    "videoUrl" TEXT,
    "imageUrl" TEXT,
    "textQuote" TEXT,
    "quoteAuthor" TEXT,
    "link" TEXT,
    "linkDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isRepost" BOOLEAN DEFAULT false,
    "originalPostId" TEXT,
    "userId" TEXT NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
