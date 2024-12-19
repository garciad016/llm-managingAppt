/*
  Warnings:

  - A unique constraint covering the columns `[healthCardNumber]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN "healthCardNumber" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_healthCardNumber_key" ON "Patient"("healthCardNumber");
