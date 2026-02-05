import { Router } from "express";
import { BaseController } from "../controllers/base.controller"; // Asumiendo que ahí están tus controladores
import { verifyToken } from "../middlewares/auth.middleware";

import { customersController } from "../controllers/customers.controller";
import { shipmentsController } from "../controllers/shipments.controller";
import { zonesController } from "../controllers/zones.controller";
import { deliveriesController } from "../controllers/deliveries.controller";
import { packageTypesController } from "../controllers/package-types.controller";
import { shipmentDetailsController } from "../controllers/shipment-details.controller";
import { accountTransactionsController } from "../controllers/account-transactions.controller";
import { usersController } from "../controllers/users.controller";
import { verifyAdmin } from "../middlewares/admin.middleware";

const createCrudRouter = (
  controller: BaseController,
  admin?: boolean,
): Router => {
  const router = Router();

  router.use(verifyToken);

  if (admin) {
    router.use(verifyAdmin);
  }

  router.get("/", controller.getAll);
  router.get("/:id", controller.getById);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);

  return router;
};

export const accountTransactionsRouter = createCrudRouter(
  accountTransactionsController,
);
export const customersRouter = createCrudRouter(customersController);
export const deliveriesRouter = createCrudRouter(deliveriesController);
export const packageTypesRouter = createCrudRouter(packageTypesController);
export const shipmentDetailsRouter = createCrudRouter(
  shipmentDetailsController,
);
export const shipmentsRouter = createCrudRouter(shipmentsController);
export const zonesRouter = createCrudRouter(zonesController);
export const usersRouter = createCrudRouter(usersController, true);
