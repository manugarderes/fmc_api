export type UserRole = "admin" | "counter_staff" | "driver";

export type ShipmentStatus =
  | "pending"
  | "in_delivery"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "origin" | "destination" | "checking_account";

export type TransactionType = "debit" | "credit";

// Interfaces Base (Auditoría)
interface Auditable {
  created_at?: Date;
  created_by?: string; // UUID
  updated_at?: Date;
  updated_by?: string; // UUID
}

// 1. Users
export interface User extends Auditable {
  id: string; // UUID
  username: string;
  password_hash: string;
  role: UserRole;
}

// 2. Zones
export interface Zone extends Auditable {
  id: string;
  name: string;
}

// 3. Customers
export interface Customer extends Auditable {
  id: string;
  name: string;
  razon_social?: string;
  rut?: string;
  address?: string;
  phone?: string;
  email?: string;
  zone_id?: string; // FK -> Zones
  current_balance: number;
}

// 4. Deliveries (Hojas de Ruta/Repartos)
export interface Delivery extends Auditable {
  id: string;
  name: string;
  driver_id?: string; // FK -> Users
}

// 5. Package Types
export interface PackageType extends Auditable {
  id: string;
  description: string;
  unit_price: number;
  is_active: boolean;
}

// 6. Shipments (Envíos)
export interface Shipment extends Auditable {
  id: string;
  tracking_number: string;
  sender_id: string; // FK -> Customers
  receiver_id: string; // FK -> Customers
  delivery_id?: string; // FK -> Deliveries
  payment_method: PaymentMethod;
  status: ShipmentStatus;
  total_amount: number;
  observations?: string;
  pickup_date?: Date;
  pickup_driver?: string; // FK -> Users
  delivery_date?: Date;
  delivery_driver?: string; // FK -> Users
}

// 7. Shipment Details (Items del envío)
export interface ShipmentDetail extends Auditable {
  id: string;
  shipment_id: string;
  package_type_id: string;
  quantity: number;
  subtotal: number;
}

// 8. Account Transactions (Cta Cte)
export interface AccountTransaction extends Auditable {
  id: string;
  customer_id: string;
  shipment_id?: string;
  type: TransactionType;
  amount: number;
  balance_after: number;
}
