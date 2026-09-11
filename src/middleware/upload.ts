// src/middleware/upload.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "spendly-avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  } as any,
});

const upload = multer({ storage });

export default upload;
