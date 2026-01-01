import User from "../models/User.js";

export async function listUsers(req, res) {
  try {
    const users = await User.find().select("-password");

    return res.json(users);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    return res.status(500).json({ msg: "Erro interno no servidor" });
  }
}
