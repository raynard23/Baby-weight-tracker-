/*
  Warnings:

  - The primary key for the `BabyList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `bio` to the `BabyList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BabyList" DROP CONSTRAINT "BabyList_pkey",
ADD COLUMN     "bio" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BabyList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BabyList_id_seq";
