import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import "dotenv/config";

async function main() {
  await mongoose.connect(process.env.MONGO_URI);

  const passwordHash = await bcrypt.hash("123456", 10); // senha do admin

  const admin = await User.create({
    name: "Admin Teste",
    email: "admin@teste.com",
    password: passwordHash,
    role: "admin"
  });

  console.log("✅ Admin criado:", admin);
  mongoose.disconnect();
}

main().catch(err => console.error(err));
