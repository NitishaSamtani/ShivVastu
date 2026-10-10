import express from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email?.toLowerCase().trim() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token, admin: { email: admin.email, name: admin.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify token is still valid / get current admin
router.get("/me", protect, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select("-password");
  res.json(admin);
});

export default router;
