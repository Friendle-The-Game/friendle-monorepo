/*
  Warnings:

  - You are about to drop the `FiveLetterWords` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FiveLetterWords";

-- CreateTable
CREATE TABLE "FiveLetterWord" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,

    CONSTRAINT "FiveLetterWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FiveLetterGame" (
    "id" SERIAL NOT NULL,
    "wordId" INTEGER NOT NULL,

    CONSTRAINT "FiveLetterGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FiveLetterWord_word_key" ON "FiveLetterWord"("word");

-- AddForeignKey
ALTER TABLE "FiveLetterGame" ADD CONSTRAINT "FiveLetterGame_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "FiveLetterWord"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
