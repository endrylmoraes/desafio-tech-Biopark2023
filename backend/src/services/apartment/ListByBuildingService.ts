import prismaClient from "../../prisma"

interface ProductRequest{
    id_building: string;
}

class ListByBuildingService{
    async execute({ id_building }: ProductRequest){
        console.log(id_building);
        
        const findByBuilding = await prismaClient.apartment.findMany({
          where:{
            id_building: id_building
          },  
          select:{
            id: true,
            floor: true,
            number: true,
            available: true,
            value: true,
            id_building: true
          }
        })

        return findByBuilding;
    }
}

export { ListByBuildingService }