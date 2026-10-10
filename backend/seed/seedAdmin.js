import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@shivvastu.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  await Admin.create({ email, password, name: "Shiv Vastu Admin" });
  console.log(`Admin created -> email: ${email} | password: ${password}`);
  console.log("Please change this password after first login (feature can be added to Admin panel).");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
