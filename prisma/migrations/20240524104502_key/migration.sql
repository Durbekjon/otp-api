/*
  Warnings:

  - You are about to drop the column `key` on the `Key` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Key_key_key";

-- AlterTable
ALTER TABLE "Key" DROP COLUMN "key";
