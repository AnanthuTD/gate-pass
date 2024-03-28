/*
  Warnings:

  - Added the required column `email` to the `AuthUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthUsers" ADD COLUMN     "email" TEXT NOT NULL;
