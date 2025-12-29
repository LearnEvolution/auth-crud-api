import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Item from "../models/Item.js";
import {
  createItem,
  getItems,
  updateStatus
} from "../controllers/itemController.js";

const router = express.Router();

// 📋 LISTAR PEDIDOS
router.get("/", authMiddleware, getItems);

// ➕ CRIAR PEDIDO
router.post("/", authMiddleware, createItem);

// 🔄 ATUALIZAR STATUS
router.put("/:id", authMiddleware, updateStatus);

// ❌ DELETAR PEDIDO
router.delete("/:id", authMiddleware, async (req, res) => {
  await Item.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ msg: "Pedido cancelado" });
});

export default router;
