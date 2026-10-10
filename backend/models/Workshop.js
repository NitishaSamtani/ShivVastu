import mongoose from "mongoose";

const workshopSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    eventAddress: { type: String, required: true },
    eventTime: { type: Date, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Workshop", workshopSchema);
