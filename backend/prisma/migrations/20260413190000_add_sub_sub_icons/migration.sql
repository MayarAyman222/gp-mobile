-- CreateTable
CREATE TABLE "SubSubIcon" (
    "id" SERIAL NOT NULL,
    "title_en" TEXT NOT NULL,
    "title_ar" TEXT NOT NULL,
    "title_fr" TEXT NOT NULL,
    "title_es" TEXT NOT NULL,
    "expression_en" TEXT NOT NULL,
    "expression_ar" TEXT NOT NULL,
    "expression_fr" TEXT NOT NULL,
    "expression_es" TEXT NOT NULL,
    "imgUrl" TEXT,
    "category" TEXT NOT NULL,
    "subIconId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubSubIcon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubSubIcon_title_en_subIconId_key" ON "SubSubIcon"("title_en", "subIconId");

-- AddForeignKey
ALTER TABLE "SubSubIcon"
ADD CONSTRAINT "SubSubIcon_subIconId_fkey"
FOREIGN KEY ("subIconId") REFERENCES "SubIcon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
