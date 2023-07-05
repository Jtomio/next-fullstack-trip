/*
  Warnings:

  - You are about to drop the column `roverImage` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `coverImage` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "roverImage",
ADD COLUMN     "coverImage" TEXT NOT NULL;
