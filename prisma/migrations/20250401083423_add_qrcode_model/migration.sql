-- CreateTable
CREATE TABLE "QrCode" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "movies" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QrCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QrCode_token_key" ON "QrCode"("token");
