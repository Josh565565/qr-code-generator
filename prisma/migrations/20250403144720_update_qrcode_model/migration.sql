/*
  Warnings:

  - The primary key for the `QrCode` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movies` on the `QrCode` table. All the data in the column will be lost.
  - The `id` column on the `QrCode` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "QrCode" DROP CONSTRAINT "QrCode_pkey",
DROP COLUMN "movies",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id");
