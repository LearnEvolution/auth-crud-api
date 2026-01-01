import User from "../models/User.js";

export default async function adminMiddleware(req, res, next) {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({ msg: "Usuário não encontrado" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Acesso restrito ao administrador" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ msg: "Erro ao verificar admin" });
  }
}
