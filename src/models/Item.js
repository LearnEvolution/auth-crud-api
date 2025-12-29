import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["novo", "preparando", "pronto", "entregue"],
      default: "novo"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
