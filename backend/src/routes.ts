import { Router, Request, Response } from "express";

// Middleware
import { isAuthenticated } from "./middlewares/isAuthenticated";
// User
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
// Building
import { CreateBuildingController } from "./controllers/building/CreateBuildingController";
import { ListAllBuildingsController } from "./controllers/building/ListAllBuildingsController";
// Tenant
import { CreateTenantController } from "./controllers/tenant/CreateTenantController";
import { ListAllTenantsController } from "./controllers/tenant/ListAllTenantsController";
// Locator
import { CreateLocatorController } from "./controllers/locator/CreateLocatorController";
import { ListAllLocatorsController } from "./controllers/locator/ListAllLocatorsController";

const router = Router();

// -- Routes User --
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)

// -- Routes Building --
router.post("/building", isAuthenticated, new CreateBuildingController().handle)
router.get("/buildings", isAuthenticated, new ListAllBuildingsController().handle)

// -- Routes Tenant --  
router.post("/tenant", isAuthenticated, new CreateTenantController().handle)
router.get("/tenants", isAuthenticated, new ListAllTenantsController().handle)

// -- Routes Locator --
router.post("/locator", isAuthenticated, new CreateLocatorController().handle)
router.get("/locators", isAuthenticated, new ListAllLocatorsController().handle)

export { router };