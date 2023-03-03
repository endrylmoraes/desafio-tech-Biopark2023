import { Request, Response } from "express";
import { CreateRentService } from "../../services/rent/CreateRentService";

class CreateRentController{
  async handle(req: Request, res: Response){

    const {dt_start, dt_end, id_locator, id_tenant, id_apartment} = req.body;

    const createRentService = new CreateRentService();

    const rent = await createRentService.execute({
      dt_start,
      dt_end,
      id_locator,
      id_tenant,
      id_apartment
    });
    
    return res.json(rent);
  }
}

export { CreateRentController }