import prismaClient from "../../prisma";

class ListAllLocatorsService{
  async execute(){
    const locators = await prismaClient.locator.findMany({
      select:{
        id: true,
        name: true
      }
    })

    return locators;
  }
}

export { ListAllLocatorsService }