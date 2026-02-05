import { BaseController } from "./base.controller";

export class ShipmentsController extends BaseController {
  constructor() {
    super(
      "shipments",
      ` id,
        tracking_number,
        payment_method,
        status,
        total_amount,
        observations,
        pickup_date,
        delivery_date,
        created_at,
        updated_at,
        sender:sender_id(razon_social, address, zone:zone_id(name)),
        receiver:receiver_id(razon_social, address, zone:zone_id(name)),
        pickup_driver_info:pickup_driver(username),
        delivery_driver_info:delivery_driver(username),
        creator:created_by(username),
        updater:updated_by(username),
        
        shipment_details(
            quantity,
            subtotal,
            package_types(unit_price, description)  
        )
      `,
    );
  }
}

export const shipmentsController = new ShipmentsController();
