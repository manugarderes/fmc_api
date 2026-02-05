import { BaseController } from "./base.controller";

export class AccountTransactionsController extends BaseController {
  constructor() {
    super(
      "account_transactions",
      ` id,
        type,
        amount,
        balance_after,
        created_at,
        updated_at,
        shipment:shipment_id(tracking_number),
        creator:created_by(username),
        updater:updated_by(username)
      `,
    );
  }
}

export const accountTransactionsController =
  new AccountTransactionsController();
