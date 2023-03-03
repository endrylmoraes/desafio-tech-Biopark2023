import { Router, Request, Response } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { CreateBuildingController } from "./controllers/building/CreateBuildingController";
import { ListBuildingController } from "./controllers/building/ListBuildingController";

const router = Router();

// -- Rotas User --
router.post("/usuarios", new CreateUserController().handle)
router.post("/sessao", new AuthUserController().handle)

// -- Rotas Edificio --
router.post("/edificio", isAuthenticated, new CreateBuildingController().handle)
router.get("/edificios", isAuthenticated, new ListBuildingController().handle)

export { router };