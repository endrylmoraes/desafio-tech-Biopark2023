import prismaClient from "../../prisma";

interface AuthRequest{
  email: string;
  senha: string;
}

class AuthUserService{
  async execute({ email, senha }: AuthRequest){
    
  }
}

export { AuthUserService }