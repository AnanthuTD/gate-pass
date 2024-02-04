-- AlterTable
ALTER TABLE "Visitors" ADD COLUMN     "remarks" TEXT,
ADD COLUMN     "vehicleNumber" TEXT,
ALTER COLUMN "email" DROP NOT NULL;
