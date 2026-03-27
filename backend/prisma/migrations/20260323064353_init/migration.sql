/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `SubIcon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title_en,category]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mainCategoryId` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `SubIcon` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Icon_title_en_key";

-- AlterTable
ALTER TABLE "Icon" ADD COLUMN     "mainCategoryId" INTEGER NOT NULL,
ADD COLUMN     "timePeriodId" INTEGER;

-- AlterTable
ALTER TABLE "SubIcon" DROP COLUMN "imageUrl",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MainCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimePeriod" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,

    CONSTRAINT "TimePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyNumber" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,
    "label_en" TEXT NOT NULL,
    "label_ar" TEXT NOT NULL,
    "label_fr" TEXT NOT NULL,
    "label_es" TEXT NOT NULL,

    CONSTRAINT "EmergencyNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_name_key" ON "MainCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TimePeriod_name_mainCategoryId_key" ON "TimePeriod"("name", "mainCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "EmergencyNumber_number_key" ON "EmergencyNumber"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_title_en_category_key" ON "Icon"("title_en", "category");

-- AddForeignKey
ALTER TABLE "TimePeriod" ADD CONSTRAINT "TimePeriod_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icon" ADD CONSTRAINT "Icon_timePeriodId_fkey" FOREIGN KEY ("timePeriodId") REFERENCES "TimePeriod"("id") ON DELETE SET NULL ON UPDATE CASCADE;
