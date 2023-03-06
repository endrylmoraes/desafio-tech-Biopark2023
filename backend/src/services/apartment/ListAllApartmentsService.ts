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
        building: {
          select: {
            number: true
          }
        }
      },
      orderBy: [
        {
          building: {
            number: "asc",
          },
        },
        {
          floor: "asc",
        },
        {
          number: "asc",
        }
      ]
    })

    return apartments;
  }
}

export { ListAllApartmentsService }