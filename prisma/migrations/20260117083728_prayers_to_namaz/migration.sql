/*
  Warnings:

  - You are about to drop the column `prayersCompleted` on the `dailyLog` table. All the data in the column will be lost.
  - Added the required column `namazCompleted` to the `dailyLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailyLog" DROP COLUMN "prayersCompleted",
ADD COLUMN     "namazCompleted" INTEGER NOT NULL;
