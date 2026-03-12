import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.routes.js";
import farmerRoutes from "./routes/farmer.routes.js";
import driverRoutes from "./routes/driver.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import workRoutes from "./routes/work.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reportRoutes from "./routes/report.routes.js";
import expenseRoutes from "./routes/expense.routes.js";
import machineRoutes from "./routes/machine.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import razorpayRoutes from "./routes/razorpay.routes.js";
const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://tractor-management-system-rouge.vercel.app",
    "https://tractor-management-system-rjfhwbcj9.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.use(express.json());

/* Routes */
app.use("/api/admin", adminRoutes);
app.use("/api/machines", machineRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/works", workRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/razorpay", razorpayRoutes);
export default app;
