-- CreateTable
CREATE TABLE "SleepData" (
    "id" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "sleep_data" JSONB NOT NULL,
    "sleep_experience" JSONB,
    "factors" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SleepData_pkey" PRIMARY KEY ("id")
);
