import { BaseController } from "./base.controller";

export class ZonesController extends BaseController {
  constructor() {
    super(
      "zones",
      `
        id,
        name,
        created_at,
        updated_at,
        creator:created_by(username),
        updater:updated_by(username)
      `,
    );
  }
}

export const zonesController = new ZonesController();
