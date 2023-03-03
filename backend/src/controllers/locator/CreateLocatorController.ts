import { Request, Response } from "express";
import { CreateLocatorService } from "../../services/locator/CreateLocatorService";

class CreateLocatorController{
  async handle(req: Request, res: Response){

    const { name } = req.body;

    const createLocatorService = new CreateLocatorService();

    const locator = await createLocatorService.execute({
      name
    });

    return res.json(locator);
  }
}

export { CreateLocatorController }