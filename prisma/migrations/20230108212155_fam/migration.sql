-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_blackId_fkey";

-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_whiteId_fkey";

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "whiteId" DROP NOT NULL,
ALTER COLUMN "blackId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
