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
