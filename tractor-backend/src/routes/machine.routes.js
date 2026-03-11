import express from "express";
import {
  addMachine,
  getMachines,
} from "../controllers/machine.controller.js";

const router = express.Router();

router.post("/", addMachine);
router.get("/", getMachines);

export default router;
