/*
  Warnings:

  - You are about to drop the column `videoUrl` on the `movie` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movie` DROP COLUMN `videoUrl`,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;
