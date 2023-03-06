import prismaClient from "../../prisma"

interface ListByBuildingRequest{
    id: string;
}

class ListByBuildingService{
    async execute({ id }: ListByBuildingRequest){
        const findByBuilding = await prismaClient.apartment.findMany({
          where:{
            id_building: id,
            available: true
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