import express from "express";
import Workshop from "../models/Workshop.js";
import { protect } from "../middleware/auth.js";
import { upload, uploadBufferToCloudinary } from "../middleware/upload.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const workshops = await Workshop.find().sort({ eventTime: 1 });
  res.json(workshops);
});

router.get("/:id", async (req, res) => {
  const workshop = await Workshop.findById(req.params.id);
  if (!workshop) return res.status(404).json({ message: "Workshop not found" });
  res.json(workshop);
});

router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    const { title, description, eventAddress, eventTime, price } = req.body;
    const image = req.file
      ? await uploadBufferToCloudinary(req.file, "shiv-vastu/workshops")
      : req.body.image;
    const workshop = await Workshop.create({ title, description, eventAddress, eventTime, price, image });
    res.status(201).json(workshop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      description: req.body.description,
      eventAddress: req.body.eventAddress,
      eventTime: req.body.eventTime,
      price: req.body.price,
    };
    if (req.file) update.image = await uploadBufferToCloudinary(req.file, "shiv-vastu/workshops");
    const workshop = await Workshop.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(workshop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, async (req, res) => {
  await Workshop.findByIdAndDelete(req.params.id);
  res.json({ message: "Workshop deleted" });
});

export default router;
