import Item from "../models/Item.js";
import User from "../models/User.js";

// 📦 CRIAR PEDIDO
export async function createItem(req, res) {
  try {
    const item = await Item.create({
      description: req.body.description,
      userId: req.userId,
      status: "novo"
    });

    return res.json(item);
  } catch (err) {
    return res.status(400).json({ msg: "Erro ao criar pedido" });
  }
}

// 📋 LISTAR PEDIDOS DO USUÁRIO
export async function getItems(req, res) {
  try {
    const items = await Item.find({ userId: req.userId }).sort({
      createdAt: -1
    });

    return res.json(items);
  } catch (err) {
    return res.status(500).json({ msg: "Erro ao buscar pedidos" });
  }
}

// 🔄 ATUALIZAR STATUS DO PEDIDO (ADMIN OU USUÁRIO)
export async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    // Descobre se quem está logado é admin
    const user = await User.findById(req.userId);

    let item;

    if (user.role === "admin") {
      // 🔑 ADMIN pode atualizar qualquer pedido
      item = await Item.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
    } else {
      // 👤 USUÁRIO só pode atualizar o próprio pedido
      item = await Item.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { status },
        { new: true }
      );
    }

    if (!item) {
      return res.status(404).json({ msg: "Pedido não encontrado" });
    }

    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ msg: "Erro ao atualizar status" });
  }
}
