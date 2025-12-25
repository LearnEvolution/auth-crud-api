import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
  res.json({
    msg: "Acesso autorizado 🔐",
    userId: req.userId
  });
});

export default router;
