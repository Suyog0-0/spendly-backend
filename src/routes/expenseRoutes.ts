// src/routes/expenseRoutes.ts
import { Router } from "express";
import {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import uploadReceipt from "../middleware/uploadReceipt.js";

const router = Router();

router.post(
  "/",
  isAuthenticated,
  uploadReceipt.single("receipt"),
  createExpense,
);
router.get("/", isAuthenticated, getExpenses);
router.get("/:id", isAuthenticated, getExpenseById);
router.put(
  "/:id",
  isAuthenticated,
  uploadReceipt.single("receipt"),
  updateExpense,
);
router.delete("/:id", isAuthenticated, deleteExpense);

export default router;
