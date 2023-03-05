import prismaClient from "../../prisma";

interface RentRequest{
  id: string;
}

class ListTenantPerRentService{
  async execute({ id }: RentRequest){
    const rent = await prismaClient.rent.findFirst({
      where:{
        id_apartment: id
      },
      orderBy: {
        created_at: 'desc'
      },
      select:{
        tenant: {
          select: {
            name: true,
            age: true,
            email: true,
            cpf: true
          }
        }
      }
    })
    console.log(rent);
    
    return rent;
  }
}

export { ListTenantPerRentService }