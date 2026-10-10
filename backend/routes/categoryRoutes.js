import express from "express";
import Category from "../models/Category.js";
import { protect } from "../middleware/auth.js";
import { upload, uploadBufferToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title } = req.body;
    const slug = title.toLowerCase().trim().replace(/\s+/g, "-");
    const image = req.file
      ? await uploadBufferToCloudinary(req.file, "shiv-vastu/categories")
      : req.body.image;
    const category = await Category.create({ title, slug, image });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const update = { title: req.body.title };
    if (req.body.title) update.slug = req.body.title.toLowerCase().trim().replace(/\s+/g, "-");
    if (req.file) update.image = await uploadBufferToCloudinary(req.file, "shiv-vastu/categories");
    const category = await Category.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

export default router;
