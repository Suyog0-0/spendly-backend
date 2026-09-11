// src/routes/authRoutes.ts
import { Router } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  uploadAvatar,
  changePassword,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/upload.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", isAuthenticated, getProfile);
router.post("/avatar", isAuthenticated, upload.single("avatar"), uploadAvatar);
router.put("/change-password", isAuthenticated, changePassword);

export default router;
