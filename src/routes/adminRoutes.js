import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import { listUsers } from "../controllers/adminController.js";

const router = express.Router();

// 🔐 ROTA EXCLUSIVA ADMIN
router.get("/users", authMiddleware, adminMiddleware, listUsers);

export default router;
