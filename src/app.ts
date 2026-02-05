import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Importamos la ruta de Auth (esa sí debe ser manual/separada porque es pública y lógica distinta)
import authRoutes from "./routes/auth.routes";

// Importamos TODAS las rutas automáticas desde un solo archivo
import {
  customersRouter,
  shipmentsRouter,
  zonesRouter,
  deliveriesRouter,
  packageTypesRouter,
  shipmentDetailsRouter,
  accountTransactionsRouter,
  usersRouter,
} from "./routes/base.routes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- DEFINICIÓN DE ENDPOINTS ---

// 1. Auth (Pública)
app.use("/api/auth", authRoutes);

// 2. Rutas del Sistema (Protegidas automáticamente por el createCrudRouter)
app.use("/api/customers", customersRouter);
app.use("/api/shipments", shipmentsRouter);
app.use("/api/zones", zonesRouter);
app.use("/api/deliveries", deliveriesRouter);
app.use("/api/package-types", packageTypesRouter);
app.use("/api/shipment-details", shipmentDetailsRouter);
app.use("/api/account-transactions", accountTransactionsRouter);
app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 FM CARGO Backend corriendo en puerto ${PORT}`);
});
