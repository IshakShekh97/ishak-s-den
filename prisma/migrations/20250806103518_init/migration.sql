-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "creationYear" INTEGER NOT NULL,
    "coverImage" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "designScreenshots" TEXT,
    "techStack" TEXT NOT NULL,
    "features" TEXT,
    "tags" TEXT NOT NULL,
    "githubLink" TEXT,
    "liveLink" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
