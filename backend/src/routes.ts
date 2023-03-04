import { Router } from "express";

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

// Apartment
import { CreateApartmentController } from "./controllers/apartment/CreateApartmentController";
import { ListAllApartmentsController } from "./controllers/apartment/ListAllApartmentsController";
import { ListByBuildingController } from "./controllers/apartment/ListByBuildingController";

// Rent
import { CreateRentController } from "./controllers/rent/CreateRentController";


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

// -- Routes Apartment --
router.post("/apartment", isAuthenticated, new CreateApartmentController().handle)
router.get("/apartments", isAuthenticated, new ListAllApartmentsController().handle);
router.get("/building/apartments", isAuthenticated, new ListByBuildingController().handle);

// -- Routes Rent --
router.post("/rent", isAuthenticated, new CreateRentController().handle)

export { router };