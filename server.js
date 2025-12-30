import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 PADRÃO ÚNICO
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.error(err));

app.get("/", (req, res) => {
  res.json({ status: "API rodando 🚀" });
});

app.listen(10000, () => {
  console.log("🚀 Servidor rodando na porta 10000");
});
