import prismaClient from "../../prisma";

interface RentRequest{
  dt_start: Date;
  dt_end: Date;
  id_locator: string;
  id_tenant: string;
  id_apartment: string;
}

class CreateRentService{
  async execute({ 
    dt_start, 
    dt_end, 
    id_locator, 
    id_tenant, 
    id_apartment 
  }: RentRequest){    
    const rent = await prismaClient.rent.create({
      data:{
        dt_start: new Date(dt_start), 
        dt_end: new Date(dt_end), 
        id_locator: id_locator, 
        id_tenant: id_tenant, 
        id_apartment: id_apartment
      },
      select:{
        id: true,
        dt_start: true, 
        dt_end: true, 
        id_locator: true, 
        id_tenant: true, 
        id_apartment: true
      }
    })

    // atualiza disponibilidade do AP
    if(rent){
      await prismaClient.apartment.update({
        where:{
          id: id_apartment,
        },
        data:{
          available: false,
        },
      })
    }

    return rent;
  }
}

export { CreateRentService }