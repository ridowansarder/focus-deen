/*
  Warnings:

  - You are about to drop the column `asr` on the `dailyLog` table. All the data in the column will be lost.
  - You are about to drop the column `dhuhr` on the `dailyLog` table. All the data in the column will be lost.
  - You are about to drop the column `fajr` on the `dailyLog` table. All the data in the column will be lost.
  - You are about to drop the column `isha` on the `dailyLog` table. All the data in the column will be lost.
  - You are about to drop the column `maghrib` on the `dailyLog` table. All the data in the column will be lost.
  - Added the required column `prayerTimes` to the `dailyLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quranRead` to the `dailyLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailyLog" DROP COLUMN "asr",
DROP COLUMN "dhuhr",
DROP COLUMN "fajr",
DROP COLUMN "isha",
DROP COLUMN "maghrib",
ADD COLUMN     "prayerTimes" TEXT NOT NULL,
ADD COLUMN     "quranRead" BOOLEAN NOT NULL;
