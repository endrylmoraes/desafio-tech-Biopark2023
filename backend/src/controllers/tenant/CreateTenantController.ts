import { Request, Response } from "express";
import { CreateTenantService } from "../../services/tenant/CreateTenantService";

class CreateTenantController{
  async handle(req: Request, res: Response){

    const {name, age, email, cpf} = req.body;

    const createTenantService = new CreateTenantService();

    const tenant = await createTenantService.execute({
      name,
      age,
      email,
      cpf
    });

    return res.json(tenant);
  }
}

export { CreateTenantController }