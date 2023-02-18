-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL,
    "num" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    "locked" BOOLEAN NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_whiteId_fkey" FOREIGN KEY ("whiteId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_blackId_fkey" FOREIGN KEY ("blackId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
