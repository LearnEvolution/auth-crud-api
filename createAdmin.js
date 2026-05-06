// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

// 🔑 MongoDB da Render ou Atlas
const MONGO_URL = process.env.MONGO_URI;

if (!MONGO_URL) {
  console.error("❌ Defina MONGO_URL no seu .env");
  process.exit(1);
}

async function createOrUpdateAdmin() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ Conectado ao MongoDB");

   // const email = "admin@teste.com";
   //const senha = "123456";
const email = process.env.ADMIN_EMAIL;
const senha = process.env.ADMIN_PASSWORD;
   

    let admin = await User.findOne({ email });

    const hash = await bcrypt.hash(senha, 10);

    if (admin) {
      // Atualiza a senha caso já exista
      admin.password = hash;
      admin.role = "admin";
      await admin.save();
      console.log("⚠️ Admin já existia, senha atualizada:", admin);
    } else {
      admin = await User.create({
        name: "Admin Teste",
        email,
        password: hash,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log("✅ Admin criado com sucesso:", admin);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Erro ao criar/admin atualizar:", err);
    process.exit(1);
  }
}

createOrUpdateAdmin();
