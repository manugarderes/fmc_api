import { BaseController } from "./base.controller";

export class ShipmentDetailsController extends BaseController {
  constructor() {
    super("shipment_details");
  }
}

export const shipmentDetailsController = new ShipmentDetailsController();
