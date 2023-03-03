import prismaClient from "../../prisma";

interface BuildingRequest{
  numero: number;
}

class CreateBuildingService{
  async execute({ numero }: BuildingRequest){
    if(!numero){
      throw new Error("Número inválido");
    }
    
    const building = await prismaClient.edificio.create({
      data:{
        numero: numero,
      },
      select:{
        id: true,
        numero: true,
      }
    })

    return building;
  }
}

export { CreateBuildingService }