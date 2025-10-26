/*
  Warnings:

  - Made the column `thumbnail` on table `movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `movie` MODIFY `thumbnail` VARCHAR(191) NOT NULL;
