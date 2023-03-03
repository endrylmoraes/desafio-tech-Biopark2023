import prismaClient from "../../prisma";

class ListBuildingService{
  async execute(){
    const buildings = await prismaClient.edificio.findMany({
      select:{
        id: true,
        numero: true,
      }
    })

    return buildings;
  }
}

export { ListBuildingService }