import { Request, Response } from "express";
import { ListAllRentsService } from "../../services/rent/ListAllRentsService";

class ListAllRentsController{
    async handle(req: Request, res: Response){
        const listAllRentsService = new ListAllRentsService();

        const rents = await listAllRentsService.execute();

        return res.json(rents);
    }
}

export { ListAllRentsController }