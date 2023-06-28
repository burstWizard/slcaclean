/*
  Warnings:

  - You are about to alter the column `expires_at` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `board` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `result` on the `Match` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `record` on the `Player` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.
  - You are about to alter the column `num` on the `Round` table. The data in that column could be lost. The data in that column will be cast from `Int8` to `Int4`.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "expires_at" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "Match" ALTER COLUMN "board" SET DATA TYPE INT4;
ALTER TABLE "Match" ALTER COLUMN "result" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "record" SET DATA TYPE INT4;

-- AlterTable
ALTER TABLE "Round" ALTER COLUMN "num" SET DATA TYPE INT4;
