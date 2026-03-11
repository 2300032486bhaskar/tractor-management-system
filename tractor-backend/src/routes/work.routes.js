import express from "express";
import { addWork,deleteWork } from "../controllers/work.controller.js";

const router = express.Router();

router.post("/", addWork);
router.delete("/:id", deleteWork)
export default router;
