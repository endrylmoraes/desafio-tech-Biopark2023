import prismaClient from "../../prisma";

class ListAllApartmentsService{
  async execute(){
    const apartments = await prismaClient.apartment.findMany({
      select:{
        id: true,
        floor: true,
        number: true,
        available: true,
        value: true,
        id_building: true
      }
    })

    return apartments;
  }
}

export { ListAllApartmentsService }