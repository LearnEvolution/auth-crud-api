import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

import pizzaRoutes from "./src/routes/pizzaRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// 🔑 PADRÃO ÚNICO
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.json({ status: "API rodando 🚀" });
});

app.get("/teste", (req, res) => {
  console.log("bateu na rota teste");
  res.send("ok");
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

