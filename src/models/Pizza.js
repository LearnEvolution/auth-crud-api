import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  tamanho: {
    type: String,
    enum: ["Pequena", "Media", "Grande"],
    required: true
  },
  preco: {
    type: Number,
    required: true
  },
  ativo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Pizza", pizzaSchema);
