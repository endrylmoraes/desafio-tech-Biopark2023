import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest{
    nome: string;
    email: string;
    senha: string;
}

class CreateUserService{
    async execute({ nome, email, senha }: UserRequest){
      
        // verificar se enviou email
        if (!email) {
            throw new Error("Email Incorreto!");
        }

        // verificar se o email já está cadastrado na plataforma
        const userAlreadyExists = await prismaClient.usuario.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExists){
            throw new Error("O usuário já existe!");
        }


        const passwordHash = await hash(senha, 8);

        const usuario = await prismaClient.usuario.create({
            data: {
                nome: nome,
                email: email,
                senha: passwordHash
            },
            select:{
                id: true,
                nome: true,
                email: true
            }
        })

        return usuario;
    }
} 

export { CreateUserService }