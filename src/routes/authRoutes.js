import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// 📌 REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Dados obrigatórios" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "Usuário já existe" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash
  });

  res.status(201).json({ id: user._id });
});

// 📌 LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ msg: "Credenciais inválidas" });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).json({ msg: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email
      role: user.role // ✅ ADICIONAR ISSO
    }
  });
});

export default router;
