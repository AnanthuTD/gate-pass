-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "email" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departureTime" TIMESTAMP(3),
    "purposeOfVisit" TEXT,
    "visitedDepartment" TEXT,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);
