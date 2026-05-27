-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "favoriteColorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "colors_name_key" ON "colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_favoriteColorId_fkey" FOREIGN KEY ("favoriteColorId") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
