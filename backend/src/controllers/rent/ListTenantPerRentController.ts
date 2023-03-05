import { Request, Response } from "express";
import { ListTenantPerRentService } from "../../services/rent/ListTenantPerRentService";

class ListTenantPerRentController{
  async handle(req: Request, res: Response){

    const { id } = req.body;

    const listTenantPerRentService = new ListTenantPerRentService();

    const rent = await listTenantPerRentService.execute({ id });
    
    return res.json(rent);
  }
}

export { ListTenantPerRentController }