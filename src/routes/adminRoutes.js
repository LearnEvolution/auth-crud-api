import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  listUsers,
  listAllItems,
  updateStatusAdmin
} from "../controllers/adminController.js";

const router = express.Router();

// 👥 USUÁRIOS
router.get("/users", authMiddleware, adminMiddleware, listUsers);

// 📦 PEDIDOS (ADMIN)
router.get("/items", authMiddleware, adminMiddleware, listAllItems);

// 🔄 ATUALIZAR STATUS DO PEDIDO (ADMIN)
router.put("/items/:id", authMiddleware, adminMiddleware, updateStatusAdmin);

export default router;
