import prismaClient from "../../prisma";

interface TenantRequest{
  name: string;
  age: number;
  email: string;
  cpf: string;
}

class CreateTenantService{
  async execute({ name, age, email, cpf }: TenantRequest){
    
    if(!(name && age && email && cpf)){
      throw new Error("Dados Incorretos");
    }

    const tenantAlreadyExists = await prismaClient.tenant.findFirst({
      where:{
          cpf: cpf
      }
    })

    if(tenantAlreadyExists){
        throw new Error("Já possui locatário cadastrado com este CPF!");
    }

    const tenant = await prismaClient.tenant.create({
      data:{
        name: name,
        age: age,
        email: email,
        cpf: cpf
      },
      select:{
        id: true,
        name: true,
        age: true,
        email: true,
        cpf: true
      }
    })

    return tenant;
  }
}

export { CreateTenantService }