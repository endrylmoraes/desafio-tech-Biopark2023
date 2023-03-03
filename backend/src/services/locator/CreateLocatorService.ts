import prismaClient from "../../prisma";

interface LocatorRequest{
  name: string;
}

class CreateLocatorService{
  async execute({ name }: LocatorRequest){
    
    if(!name || name === ""){
      throw new Error("Dados Incorretos");
    }

    const locatorAlreadyExists = await prismaClient.locator.findFirst({
      where:{
          name: name
      }
    })

    if(locatorAlreadyExists){
        throw new Error("Este locatário já está cadastrado!");
    }

    const locator = await prismaClient.locator.create({
      data:{
        name: name
      },
      select:{
        id: true,
        name: true
      }
    })

    return locator;
  }
}

export { CreateLocatorService }