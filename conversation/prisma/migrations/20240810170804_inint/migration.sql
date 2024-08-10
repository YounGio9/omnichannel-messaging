/*
  Warnings:

  - You are about to drop the column `sender_id` on the `Message` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "sender_id",
ADD COLUMN     "senderId" TEXT NOT NULL;
