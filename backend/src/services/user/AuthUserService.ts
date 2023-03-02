import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
  email: string;
  senha: string;
}

class AuthUserService{
  async execute({ email, senha }: AuthRequest){
    
    const usuario = await prismaClient.usuario.findFirst({
      where:{
          email: email
      }
    });
    
    if(!usuario){
        throw new Error("Usuário não encontrado!");
    }

    const senhaOK = await compare(senha, usuario.senha);

    if(!senhaOK){
        throw new Error("Senha incorreta!");
    }

    //gerar um token JWT e devolver os dados do usuario(id, nome, email)
    const token = sign(
      {
          nome: usuario.nome,
          email: usuario.email
      },
      String(process.env.JWT_SECRET),
      {
          subject: usuario.id,
          expiresIn: '30d'
      }
    );

    return { 
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token: token
    };

  }
}

export { AuthUserService }