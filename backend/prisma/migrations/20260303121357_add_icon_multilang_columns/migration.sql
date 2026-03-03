/*
  Warnings:

  - You are about to drop the column `expression` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `expression` on the `SubIcon` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SubIcon` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title_en]` on the table `Icon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title_en,iconId]` on the table `SubIcon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expression_ar` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_en` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_es` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_fr` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_ar` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_es` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fr` to the `Icon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_ar` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_en` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_es` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expression_fr` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_ar` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_en` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_es` to the `SubIcon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_fr` to the `SubIcon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('AUTISM', 'STROKE', 'ALZHEIMER', 'SPEECH_DELAY', 'OTHER');

-- AlterTable
ALTER TABLE "Icon" DROP COLUMN "expression",
DROP COLUMN "title",
ADD COLUMN     "expression_ar" TEXT NOT NULL,
ADD COLUMN     "expression_en" TEXT NOT NULL,
ADD COLUMN     "expression_es" TEXT NOT NULL,
ADD COLUMN     "expression_fr" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "title_ar" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL,
ADD COLUMN     "title_es" TEXT NOT NULL,
ADD COLUMN     "title_fr" TEXT NOT NULL,
ALTER COLUMN "iconName" DROP NOT NULL,
ALTER COLUMN "iconName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "SubIcon" DROP COLUMN "expression",
DROP COLUMN "title",
ADD COLUMN     "expression_ar" TEXT NOT NULL,
ADD COLUMN     "expression_en" TEXT NOT NULL,
ADD COLUMN     "expression_es" TEXT NOT NULL,
ADD COLUMN     "expression_fr" TEXT NOT NULL,
ADD COLUMN     "title_ar" TEXT NOT NULL,
ADD COLUMN     "title_en" TEXT NOT NULL,
ADD COLUMN     "title_es" TEXT NOT NULL,
ADD COLUMN     "title_fr" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "condition" "Condition" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_title_en_key" ON "Icon"("title_en");

-- CreateIndex
CREATE UNIQUE INDEX "SubIcon_title_en_iconId_key" ON "SubIcon"("title_en", "iconId");
