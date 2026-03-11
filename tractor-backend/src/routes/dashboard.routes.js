import express from "express";
import { dashboardSummary, monthlyReport } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", dashboardSummary);
router.get("/monthly-report", monthlyReport);

export default router;
