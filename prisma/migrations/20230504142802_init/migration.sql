-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateTable
CREATE TABLE "document" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "checksum" TEXT,
    "meta" JSONB,
    "type" TEXT,
    "source" TEXT,
    "content" TEXT,
    "token_count" INTEGER,
    "slug" TEXT,
    "heading" TEXT,
    "embedding" vector(1536),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "default_prompt_id" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter" (
    "id" TEXT NOT NULL,
    "prompt_id" TEXT NOT NULL,
    "document_id" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prompt" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "template" TEXT NOT NULL,
    "subscriber_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "document_path_key" ON "document"("path");

-- CreateIndex
CREATE INDEX "newsletter.score_index" ON "newsletter"("score");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter.promptId_documentId_unique" ON "newsletter"("prompt_id", "document_id");

-- AddForeignKey
ALTER TABLE "newsletter" ADD CONSTRAINT "newsletter_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_subscriber_id_fkey" FOREIGN KEY ("subscriber_id") REFERENCES "subscriber"("id") ON DELETE SET NULL ON UPDATE CASCADE;
