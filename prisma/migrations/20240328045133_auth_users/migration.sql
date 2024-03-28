-- CreateTable
CREATE TABLE "Visitors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" BIGINT NOT NULL,
    "vehicleNumber" TEXT,
    "email" TEXT,
    "arrivalTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "departureTime" TIMESTAMP(3),
    "purposeOfVisit" TEXT,
    "visitedDepartment" TEXT,
    "remarks" TEXT,

    CONSTRAINT "Visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthUsers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AuthUsers_pkey" PRIMARY KEY ("id")
);
