/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `dailyLog` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "dailyLog_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "dailyLog_userId_date_key" ON "dailyLog"("userId", "date");
