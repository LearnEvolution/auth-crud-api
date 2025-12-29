import Item from "../models/Item.js";

// 📦 CRIAR PEDIDO
export async function createItem(req, res) {
  try {
    const item = await Item.create({
      description: req.body.description,
      userId: req.userId,
      status: "novo"
    });

    res.json(item);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao criar pedido" });
  }
}

// 📋 LISTAR PEDIDOS DO USUÁRIO
export async function getItems(req, res) {
  try {
    const items = await Item.find({ userId: req.userId }).sort({
      createdAt: -1
    });

    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: "Erro ao buscar pedidos" });
  }
}

// 🔄 ATUALIZAR STATUS DO PEDIDO
export async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { status },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ msg: "Pedido não encontrado" });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ msg: "Erro ao atualizar status" });
  }
}
