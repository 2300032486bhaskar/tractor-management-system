import express from "express";
import {
  loginAdmin,
  createAdmin,
  getAllAdmins,
} from "../controllers/admin.controller.js";
import { authenticate } from "../middleware/auth.js";
import { authorizeRoles } from "../middleware/role.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.post(
  "/create",
  authenticate,
  authorizeRoles("superadmin"),
  createAdmin
);

router.get(
  "/all",
  authenticate,
  authorizeRoles("superadmin"),
  getAllAdmins
);

export default router;