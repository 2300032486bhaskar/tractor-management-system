import express from "express";
import {
  upsertRate,
  getRates,
  getRateByType,
} from "../controllers/rate.controller.js";

const router = express.Router();

router.post("/", upsertRate);
router.get("/", getRates);
router.get("/:workType", getRateByType);

export default router;
