// src/middleware/uploadReceipt.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "spendly-receipts",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
  } as any,
});

const uploadReceipt = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export default uploadReceipt;
