import { Request, Response } from "express";
import { ListAllTenantsService } from "../../services/tenant/ListAllTenantsService";

class ListAllTenantsController{
  async handle(req: Request, res: Response){
    const listAllTenantsService = new ListAllTenantsService();

    const tenants = await listAllTenantsService.execute();

    return res.json(tenants);
  }
}

export { ListAllTenantsController }

