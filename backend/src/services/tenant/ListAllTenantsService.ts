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
      },
      orderBy: [
        {
          name: "asc",
        },
        {
          age: "asc",
        },
        {
          email: "asc",
        }
      ]
    })

    return tenants;
  }
}

export { ListAllTenantsService }