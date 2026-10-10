import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";
import { upload, uploadBufferToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

router.get("/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.json(service);
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file
      ? await uploadBufferToCloudinary(req.file, "shiv-vastu/services")
      : req.body.image;
    const service = await Service.create({ title, description, image });
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const update = { title: req.body.title, description: req.body.description };
    if (req.file) update.image = await uploadBufferToCloudinary(req.file, "shiv-vastu/services");
    const service = await Service.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(service);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
});

export default router;
