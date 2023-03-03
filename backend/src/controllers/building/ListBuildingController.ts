import { Request, Response } from "express";
import { ListBuildingService } from "../../services/building/ListBuildingService";

class ListBuildingController{
  async handle(req: Request, res: Response){
    const listBuildingService = new ListBuildingService();

    const buildings = await listBuildingService.execute();

    return res.json(buildings);
  }
}

export { ListBuildingController }

