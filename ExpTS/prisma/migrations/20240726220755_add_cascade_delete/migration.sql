-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_majorId_fkey`;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `majors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
