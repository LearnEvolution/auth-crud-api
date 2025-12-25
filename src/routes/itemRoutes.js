import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Item from "../models/Item.js";

const router = express.Router();

// 🔐 LISTAR ITENS DO USUÁRIO
router.get("/", authMiddleware, async (req, res) => {
  const items = await Item.find({ userId: req.userId });
  res.json(items);
});

// 🔐 CRIAR ITEM
router.post("/", authMiddleware, async (req, res) => {
  const item = await Item.create({
    title: req.body.title,
    userId: req.userId
  });

  res.status(201).json(item);
});

// 🔐 DELETAR ITEM
router.delete("/:id", authMiddleware, async (req, res) => {
  await Item.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ msg: "Item removido" });
});

export default router;
