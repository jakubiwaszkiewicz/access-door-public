/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_accessID_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_adminID_fkey`;

-- DropForeignKey
ALTER TABLE `Log` DROP FOREIGN KEY `Log_doorId_fkey`;

-- DropTable
DROP TABLE `Log`;

-- CreateTable
CREATE TABLE `AccessAddedByLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `accessID` INTEGER NOT NULL,
    `adminID` INTEGER NOT NULL,
    `doorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DoorOpenedLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `doorId` INTEGER NOT NULL,
    `labourerID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccessAddedByLog` ADD CONSTRAINT `AccessAddedByLog_accessID_fkey` FOREIGN KEY (`accessID`) REFERENCES `Access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessAddedByLog` ADD CONSTRAINT `AccessAddedByLog_adminID_fkey` FOREIGN KEY (`adminID`) REFERENCES `Labourer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccessAddedByLog` ADD CONSTRAINT `AccessAddedByLog_doorId_fkey` FOREIGN KEY (`doorId`) REFERENCES `Door`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoorOpenedLog` ADD CONSTRAINT `DoorOpenedLog_doorId_fkey` FOREIGN KEY (`doorId`) REFERENCES `Door`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DoorOpenedLog` ADD CONSTRAINT `DoorOpenedLog_labourerID_fkey` FOREIGN KEY (`labourerID`) REFERENCES `Labourer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
