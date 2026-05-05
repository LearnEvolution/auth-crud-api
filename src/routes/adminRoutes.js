import express from "express";
const router = express.Router();

import User from "../models/User.js";
import Item from "../models/Item.js";


// 👥 LISTAR USUÁRIOS
export async function listUsers(req, res) {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
}

// 📦 LISTAR TODOS OS PEDIDOS (ADMIN)
export async function listAllItems(req, res) {
  try {
    const items = await Item.find()
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    return res.json(items);
  } catch (err) {
    console.error("Erro ao listar pedidos:", err);
    return res.status(500).json({ msg: "Erro ao listar pedidos" });
  }
}

// 🔄 ATUALIZAR STATUS DO PEDIDO (ADMIN)
export async function updateStatusAdmin(req, res) {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ msg: "Status não informado" });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ msg: "Pedido não encontrado" });
    }

    return res.json(item);
  } catch (err) {
    console.error("Erro ao atualizar status (admin):", err);
    return res.status(400).json({ msg: "Erro ao atualizar status" });
  }

}

router.get("/users", listUsers);
router.get("/items", listAllItems);
router.put("/items/:id", updateStatusAdmin);

export default router;
