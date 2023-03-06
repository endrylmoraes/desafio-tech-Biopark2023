import { Request, Response } from "express";
import { ListByBuildingService } from "../../services/apartment/ListByBuildingService";

class ListByBuildingController{
    async handle(req: Request, res: Response){
        const id = req.query.id as string; //este vem por query params

        const listByBuildingService = new ListByBuildingService();

        const products = await listByBuildingService.execute({
            id
        });

        return res.json(products);
    }
}

export { ListByBuildingController }