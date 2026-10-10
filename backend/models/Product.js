import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
