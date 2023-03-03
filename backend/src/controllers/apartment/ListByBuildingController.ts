import { Request, Response } from "express";
import { ListByBuildingService } from "../../services/apartment/ListByBuildingService";

class ListByBuildingController{
    async handle(req: Request, res: Response){
        const id_building = req.query.id_building as string; //este vem por query params

        const listByBuildingService = new ListByBuildingService();

        const products = await listByBuildingService.execute({
            id_building
        });

        return res.json(products);
    }
}

export { ListByBuildingController }