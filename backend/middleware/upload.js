import multer from "multer";
import cloudinary from "../config/cloudinary.js";

// Files are kept in memory (not written to local disk) and streamed
// straight to Cloudinary — this is what makes uploads survive Render's
// ephemeral filesystem, which wipes any local /uploads folder on every
// restart, deploy, or free-tier sleep/wake cycle.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowed = /^image\/(jpeg|jpg|png|webp)$/;
  allowed.test(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Only image files (jpg, jpeg, png, webp) are allowed"));
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// Uploads a single Multer file (in-memory buffer) to Cloudinary and
// returns its public, permanent URL.
export const uploadBufferToCloudinary = async (file, folder = "shiv-vastu") => {
  const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(base64, {
    folder,
    resource_type: "image",
  });
  return result.secure_url;
};

// Uploads several Multer files in parallel, returns an array of URLs
// in the same order as the input files.
export const uploadFilesToCloudinary = (files, folder = "shiv-vastu") =>
  Promise.all(files.map((file) => uploadBufferToCloudinary(file, folder)));
