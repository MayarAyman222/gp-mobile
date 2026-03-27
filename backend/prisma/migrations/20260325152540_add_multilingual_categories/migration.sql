-- AlterTable
ALTER TABLE "MainCategory" ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "title_ar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_es" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_fr" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "TimePeriod" ADD COLUMN     "imgUrl" TEXT,
ADD COLUMN     "title_ar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_en" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_es" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "title_fr" TEXT NOT NULL DEFAULT '';
