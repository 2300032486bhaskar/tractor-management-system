import express from "express";
import {
  addFarmer,
  getAllFarmers,
  searchFarmer,
  getFarmerLedger,
  deleteFarmer,
} from "../controllers/farmer.controller.js";

const router = express.Router();

router.post("/", addFarmer);
router.get("/", getAllFarmers);
router.get("/search", searchFarmer);
router.get("/:id/ledger", getFarmerLedger);
router.delete("/:id", deleteFarmer);

export default router;