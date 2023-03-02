/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "edificios" (
    "id" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "edificios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartamentos" (
    "id" TEXT NOT NULL,
    "andar" INTEGER NOT NULL,
    "numero" INTEGER NOT NULL,
    "fl_disponivel" BOOLEAN NOT NULL,
    "valor" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_edificio" TEXT NOT NULL,

    CONSTRAINT "apartamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inquilinos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inquilinos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locatarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "locatarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contratos" (
    "id" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL,
    "data_fim" TIMESTAMP(3) NOT NULL,
    "criado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "id_locatario" TEXT NOT NULL,
    "id_inquilino" TEXT NOT NULL,
    "id_apartamento" TEXT NOT NULL,

    CONSTRAINT "contratos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "apartamentos" ADD CONSTRAINT "apartamentos_id_edificio_fkey" FOREIGN KEY ("id_edificio") REFERENCES "edificios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_id_locatario_fkey" FOREIGN KEY ("id_locatario") REFERENCES "locatarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_id_inquilino_fkey" FOREIGN KEY ("id_inquilino") REFERENCES "inquilinos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contratos" ADD CONSTRAINT "contratos_id_apartamento_fkey" FOREIGN KEY ("id_apartamento") REFERENCES "apartamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
