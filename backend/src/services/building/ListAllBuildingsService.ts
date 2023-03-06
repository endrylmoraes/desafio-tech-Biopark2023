import prismaClient from "../../prisma";

class ListAllBuildingsService{
  async execute(){
    const buildings = await prismaClient.building.findMany({
      select:{
        id: true,
        number: true,
      },
      orderBy: {
        number: "asc",
      }
    })

    return buildings;
  }
}

export { ListAllBuildingsService }