/*
  Warnings:

  - You are about to drop the `apartamentos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contratos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `edificios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inquilinos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `locatarios` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "apartamentos" DROP CONSTRAINT "apartamentos_id_edificio_fkey";

-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_id_apartamento_fkey";

-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_id_inquilino_fkey";

-- DropForeignKey
ALTER TABLE "contratos" DROP CONSTRAINT "contratos_id_locatario_fkey";

-- DropTable
DROP TABLE "apartamentos";

-- DropTable
DROP TABLE "contratos";

-- DropTable
DROP TABLE "edificios";

-- DropTable
DROP TABLE "inquilinos";

-- DropTable
DROP TABLE "locatarios";

-- DropTable
DROP TABLE "usuarios";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buildings" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartments" (
    "id" TEXT NOT NULL,
    "floor" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "available" BOOLEAN NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_building" TEXT NOT NULL,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locators" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "dt_start" TIMESTAMP(3) NOT NULL,
    "dt_end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_locator" TEXT NOT NULL,
    "id_tenant" TEXT NOT NULL,
    "id_apartment" TEXT NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_id_building_fkey" FOREIGN KEY ("id_building") REFERENCES "buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_locator_fkey" FOREIGN KEY ("id_locator") REFERENCES "locators"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_tenant_fkey" FOREIGN KEY ("id_tenant") REFERENCES "tenants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_id_apartment_fkey" FOREIGN KEY ("id_apartment") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
