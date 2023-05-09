/*
  Warnings:

  - Added the required column `published_at` to the `newsletter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "newsletter" ADD COLUMN     "published_at" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "newsletter.publishedAt_index" ON "newsletter"("published_at");

-- AddForeignKey
ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
