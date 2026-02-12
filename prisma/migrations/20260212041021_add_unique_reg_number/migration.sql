/*
  Warnings:

  - A unique constraint covering the columns `[registrationNumber]` on the table `ClientCompany` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ClientCompany_registrationNumber_key" ON "ClientCompany"("registrationNumber");
