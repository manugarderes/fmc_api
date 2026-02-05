import { BaseController } from "./base.controller";

export class CustomersController extends BaseController {
  constructor() {
    super(
      "customers",
      ` id,
        name,
        razon_social,
        rut,
        address,
        phone,
        email,
        current_balance,
        created_at,
        updated_at,

        zone:zone_id(name),
        creator:created_by(username),
        updater:updated_by(username)
      `,
    );
  }
}

export const customersController = new CustomersController();
