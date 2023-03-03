import { Router, Request, Response } from "express";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { CreateBuildingController } from "./controllers/building/CreateBuildingController";
import { ListAllBuildingsController } from "./controllers/building/ListAllBuildingsController";

import { CreateTenantController } from "./controllers/tenant/CreateTenantController";

const router = Router();

// -- Rotas User --
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)

// -- Rotas Edificio --
router.post("/building", isAuthenticated, new CreateBuildingController().handle)
router.get("/buildings", isAuthenticated, new ListAllBuildingsController().handle)

// -- Rotas Inquilino --
router.post("/tenant", isAuthenticated, new CreateTenantController().handle)


export { router };