import prismaClient from "../../prisma";

interface BuildingRequest{
  number: number;
}

class CreateBuildingService{
  async execute({ number }: BuildingRequest){
    if(!number){
      throw new Error("Número inválido");
    }
    
    const building = await prismaClient.building.create({
      data:{
        number: number,
      },
      select:{
        id: true,
        number: true,
      }
    })

    return building;
  }
}

export { CreateBuildingService }