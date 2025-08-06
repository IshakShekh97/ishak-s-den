/*
  Warnings:

  - You are about to drop the column `color` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the column `iconUrl` on the `Technology` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Technology` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Technology" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Technology" ("createdAt", "id", "name") SELECT "createdAt", "id", "name" FROM "Technology";
DROP TABLE "Technology";
ALTER TABLE "new_Technology" RENAME TO "Technology";
CREATE UNIQUE INDEX "Technology_name_key" ON "Technology"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
