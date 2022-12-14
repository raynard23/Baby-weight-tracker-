/*
  Warnings:

  - Made the column `date` on table `BabyList` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BabyList" ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" SET DATA TYPE DATE;
