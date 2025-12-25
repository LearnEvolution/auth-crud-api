import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    title: String,
    userId: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);
