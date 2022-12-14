-- CreateTable
CREATE TABLE "BabyList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "BabyList_pkey" PRIMARY KEY ("id")
);
