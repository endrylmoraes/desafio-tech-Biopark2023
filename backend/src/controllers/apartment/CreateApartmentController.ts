import { Request, Response } from "express";
import { CreateApartmentService } from "../../services/apartment/CreateApartmentService";

class CreateApartmentController{
  async handle(req: Request, res: Response){

    const { floor, number, value, id_building } = req.body;

    const createApartmentService = new CreateApartmentService();

    const apartment = await createApartmentService.execute({
      floor, 
      number, 
      value, 
      id_building
    });

    return res.json(apartment);
  }
}

export { CreateApartmentController }