import express from "express";
import {
  getAllDrivers,
  getDriverLedger,
  createDriver,
} from "../controllers/driver.controller.js";

const router = express.Router();

router.get("/", getAllDrivers);
router.post("/", createDriver);
router.get("/:id/ledger", getDriverLedger);

export default router;