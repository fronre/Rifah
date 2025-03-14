/*
  Warnings:

  - Added the required column `userId` to the `SleepData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SleepData" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SleepData" ADD CONSTRAINT "SleepData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
