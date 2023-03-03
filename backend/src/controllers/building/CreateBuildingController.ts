import { Request, Response } from "express";
import { CreateBuildingService } from "../../services/building/CreateBuildingService";

class CreateBuildingController{
  async handle(req: Request, res: Response){

    const {numero} = req.body;

    const createBuildingService = new CreateBuildingService();

    const building = await createBuildingService.execute({
      numero
    });

    return res.json(building);
  }
}

export { CreateBuildingController }