-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "record" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "whiteId" TEXT NOT NULL,
    "blackId" TEXT NOT NULL,
    "result" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);
