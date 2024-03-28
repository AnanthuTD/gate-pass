/*
  Warnings:

  - The primary key for the `AuthUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `AuthUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `AuthUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AuthUsers" DROP CONSTRAINT "AuthUsers_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "AuthUsers_pkey" PRIMARY KEY ("email");

-- CreateIndex
CREATE UNIQUE INDEX "AuthUsers_email_key" ON "AuthUsers"("email");
