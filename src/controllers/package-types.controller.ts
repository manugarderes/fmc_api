import { BaseController } from "./base.controller";

export class PackageTypesController extends BaseController {
  constructor() {
    super(
      "package_types",
      ` id,
        description,
        unit_price,
        is_active,
        created_at,
        updated_at,
        creator:created_by(username),
        updater:updated_by(username)
      `,
    );
  }
}

export const packageTypesController = new PackageTypesController();
