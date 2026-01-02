import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  listUsers,
  listAllItems
} from "../controllers/adminController.js";

const router = express.Router();

// 👥 USUÁRIOS
router.get("/users", authMiddleware, adminMiddleware, listUsers);

// 📦 PEDIDOS (ADMIN)
router.get("/items", authMiddleware, adminMiddleware, listAllItems);

export default router;
