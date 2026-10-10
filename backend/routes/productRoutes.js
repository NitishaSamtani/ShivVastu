import express from "express";
import Product from "../models/Product.js";
import { protect } from "../middleware/auth.js";
import { upload, uploadFilesToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  const products = await Product.find(filter).populate("category").sort({ createdAt: -1 });
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

router.post("/", protect, upload.array("images", 5), async (req, res) => {
  try {
    const { title, category, price, description } = req.body;
    const images = req.files?.length
      ? await uploadFilesToCloudinary(req.files, "shiv-vastu/products")
      : JSON.parse(req.body.images || "[]");
    const product = await Product.create({ title, category, price, description, images });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.array("images", 5), async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
    };
    if (req.files?.length) update.images = await uploadFilesToCloudinary(req.files, "shiv-vastu/products");
    const product = await Product.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

export default router;
