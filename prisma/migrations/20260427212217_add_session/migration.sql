-- CreateTable
CREATE TABLE "Seesion" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "deviceIdentifier" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Seesion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seesion_sessionToken_key" ON "Seesion"("sessionToken");

-- AddForeignKey
ALTER TABLE "Seesion" ADD CONSTRAINT "Seesion_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("phone") ON DELETE CASCADE ON UPDATE CASCADE;
