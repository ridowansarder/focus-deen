-- CreateTable
CREATE TABLE "DailyLog" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "DailyLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyLog_date_key" ON "DailyLog"("date");

-- CreateIndex
CREATE INDEX "DailyLog_date_idx" ON "DailyLog"("date");
