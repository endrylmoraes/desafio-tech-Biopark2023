import { Request, Response } from "express";
import { CreateBuildingService } from "../../services/building/CreateBuildingService";

class CreateBuildingController{
  async handle(req: Request, res: Response){

    const { number } = req.body;

    const createBuildingService = new CreateBuildingService();

    const building = await createBuildingService.execute({
      number
    });

    return res.json(building);
  }
}

export { CreateBuildingController }