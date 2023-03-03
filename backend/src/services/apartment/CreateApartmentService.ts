import prismaClient from "../../prisma";

interface ApartmentRequest{
    floor: number;
    number: number,
    value: string;
    id_building: string;
}

class CreateApartmentService{
  async execute({ floor, number, value, id_building }: ApartmentRequest){
      
    if(!floor || !number || value ==='' || id_building ===''){
      throw new Error("Argumentos invalidos");
    }

    const apartmentAlreadyExists = await prismaClient.apartment.findFirst({
      where:{
        floor: floor,
        number: number,
        id_building: id_building
      }
    })

    if(apartmentAlreadyExists){
      throw new Error("Este apartamento já foi cadastrado!");
    }

    const apartment = await prismaClient.apartment.create({
      data:{
        floor: floor, 
        number: number, 
        value: value, 
        id_building: id_building
      },
      select:{
        id: true,
        floor: true,
        number: true,
        value: true,
        id_building: true,
        available: true
      }
    })

    return apartment;
  }
}

export { CreateApartmentService }