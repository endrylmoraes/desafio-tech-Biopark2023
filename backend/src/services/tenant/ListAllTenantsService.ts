import prismaClient from "../../prisma";

class ListAllTenantsService{
  async execute(){
    const tenants = await prismaClient.tenant.findMany({
      select:{
        id: true,
        name: true,
        age: true,
        email: true,
        cpf: true,
      }
    })

    return tenants;
  }
}

export { ListAllTenantsService }