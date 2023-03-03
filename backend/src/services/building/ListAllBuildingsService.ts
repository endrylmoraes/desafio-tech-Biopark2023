import prismaClient from "../../prisma";

class ListAllBuildingsService{
  async execute(){
    const buildings = await prismaClient.building.findMany({
      select:{
        id: true,
        number: true,
      }
    })

    return buildings;
  }
}

export { ListAllBuildingsService }