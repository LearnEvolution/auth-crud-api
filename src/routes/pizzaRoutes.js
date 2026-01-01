import express from "express";
import Pizza from "../models/Pizza.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Criar pizza (protegido)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const pizza = await Pizza.create(req.body);
    res.status(201).json(pizza);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar pizzas (público)
router.get("/", async (req, res) => {
  const pizzas = await Pizza.find({ ativo: true });
  res.json(pizzas);
});

export default router;
