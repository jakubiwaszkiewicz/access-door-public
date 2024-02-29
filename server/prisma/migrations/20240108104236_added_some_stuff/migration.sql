/*
  Warnings:

  - You are about to drop the column `accesedByID` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `addedByID` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Access` table. All the data in the column will be lost.
  - You are about to drop the column `labourerID` on the `Log` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Log` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Door` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `labourerID` to the `Access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessID` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminID` to the `Log` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doorId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Access` DROP FOREIGN KEY `Access_accesedByID_fkey`;

-- DropForeignKey
ALTER TABLE `Access` DROP FOREIGN KEY `Access_addedByID_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_labourerID_fkey`;

-- AlterTable
ALTER TABLE `Access` DROP COLUMN `accesedByID`,
    DROP COLUMN `addedByID`,
    DROP COLUMN `name`,
    ADD COLUMN `labourerID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Log` DROP COLUMN `labourerID`,
    DROP COLUMN `message`,
    ADD COLUMN `accessID` INTEGER NOT NULL,
    ADD COLUMN `adminID` INTEGER NOT NULL,
    ADD COLUMN `doorId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Door_name_key` ON `Door`(`name`);

-- AddForeignKey
ALTER TABLE `Access` ADD CONSTRAINT `Access_labourerID_fkey` FOREIGN KEY (`labourerID`) REFERENCES `Labourer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_accessID_fkey` FOREIGN KEY (`accessID`) REFERENCES `Access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_adminID_fkey` FOREIGN KEY (`adminID`) REFERENCES `Labourer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_doorId_fkey` FOREIGN KEY (`doorId`) REFERENCES `Door`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
