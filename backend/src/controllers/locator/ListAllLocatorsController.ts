import { Request, Response } from "express";
import { ListAllLocatorsService } from "../../services/locator/ListAllLocatorsService";

class ListAllLocatorsController{
  async handle(req: Request, res: Response){
    const listAllLocatorsService = new ListAllLocatorsService();

    const locators = await listAllLocatorsService.execute();

    return res.json(locators);
  }
}

export { ListAllLocatorsController }

