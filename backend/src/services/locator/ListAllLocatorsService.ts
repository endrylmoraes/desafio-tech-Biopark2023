import prismaClient from "../../prisma";

class ListAllLocatorsService{
  async execute(){
    const locators = await prismaClient.locator.findMany({
      select:{
        id: true,
        name: true
      },
      orderBy: {
        name: "asc",
      }
    })

    return locators;
  }
}

export { ListAllLocatorsService }