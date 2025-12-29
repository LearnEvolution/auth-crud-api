import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import itemRoutes from "./src/routes/itemRoutes.js";
import privateRoutes from "./src/routes/private.js";

dotenv.config();

const app = express();

/* 🔥 CORS CORRETO */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://auth-crud-react.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "API Auth + CRUD rodando 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/private", privateRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => console.log("❌ Erro Mongo:", err.message));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
