import express from "express";
import { generatePaymentReceipt } from "../controllers/payment.controller.js";
import {
  addPayment,
  getPaymentsByFarmer,deletePayment
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", addPayment);
router.get("/farmer/:farmerId", getPaymentsByFarmer);
router.delete("/:id", deletePayment);
router.get("/receipt/:id", generatePaymentReceipt);
export default router;
