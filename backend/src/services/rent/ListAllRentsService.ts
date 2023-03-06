import prismaClient from "../../prisma";

class ListAllRentsService{
  async execute(){
    const rents = await prismaClient.rent.findMany({
      select:{
        id: true,
        dt_start: true,
        dt_end: true,
        
        locator:{
          select:{
            name:true
          }
        },

        tenant:{
          select:{
            name: true,
            age: true,
            email: true,
            cpf: true
          }
        },

        apartment:{
          select:{
            floor: true,
			      number: true,

            building:{
              select:{
                number: true
              }
            }
          }
        }
      }
    })

    return rents;
  }
}

export { ListAllRentsService }