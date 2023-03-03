import { Request, Response } from "express";
import { ListAllApartmentsService } from "../../services/apartment/ListAllApartmentsService";

class ListAllApartmentsController{
    async handle(req: Request, res: Response){
        const listAllApartmentsService = new ListAllApartmentsService();

        const products = await listAllApartmentsService.execute();

        return res.json(products);
    }
}

export { ListAllApartmentsController }