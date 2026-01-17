/*
  Warnings:

  - You are about to drop the `DailyLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "DailyLog";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "imageUrl" TEXT,
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dailyLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studyHours" DOUBLE PRECISION NOT NULL,
    "programmingHours" DOUBLE PRECISION NOT NULL,
    "fajr" BOOLEAN NOT NULL,
    "dhuhr" BOOLEAN NOT NULL,
    "asr" BOOLEAN NOT NULL,
    "maghrib" BOOLEAN NOT NULL,
    "isha" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_clerkUserId_key" ON "user"("clerkUserId");

-- CreateIndex
CREATE INDEX "user_clerkUserId_idx" ON "user"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "dailyLog_date_key" ON "dailyLog"("date");

-- CreateIndex
CREATE INDEX "dailyLog_date_idx" ON "dailyLog"("date");

-- AddForeignKey
ALTER TABLE "dailyLog" ADD CONSTRAINT "dailyLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("clerkUserId") ON DELETE CASCADE ON UPDATE CASCADE;
