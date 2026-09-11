// src/controllers/expenseController.ts
import type { Response } from "express";
import type { AuthRequest } from "../middleware/isAuthenticated.js";
import Expense, { type ILineItem } from "../models/Expense.js";

const computeAmount = (lineItems: ILineItem[]) =>
  lineItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);

const parseLineItems = (raw: unknown): ILineItem[] => {
  if (typeof raw !== "string")
    throw new Error("lineItems must be a JSON string");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("lineItems must be a non-empty array");
  }
  return parsed.map((item) => ({
    name: String(item.name),
    qty: Number(item.qty),
    unitPrice: Number(item.unitPrice),
  }));
};

export const createExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, paymentMethod, notes, date, lineItems } = req.body;

    if (!title || !category || !date || !lineItems) {
      return res.status(400).json({
        message: "title, category, date, and lineItems are required",
      });
    }

    const parsedItems = parseLineItems(lineItems);
    const amount = computeAmount(parsedItems);

    const expense = await Expense.create({
      user: req.user!.id,
      title,
      category,
      paymentMethod,
      notes,
      date: new Date(date),
      lineItems: parsedItems,
      amount,
      receipt: req.file ? (req.file as any).path : undefined,
    });

    res.status(201).json({ message: "Expense created", expense });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: err instanceof Error ? err.message : "Server error" });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const expenses = await Expense.find({ user: req.user!.id }).sort({
      date: -1,
    });
    res.json({ expenses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExpenseById = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user!.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ expense });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, category, paymentMethod, notes, date, lineItems } = req.body;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod;
    if (notes !== undefined) updateData.notes = notes;
    if (date !== undefined) updateData.date = new Date(date);
    if (lineItems !== undefined) {
      const parsedItems = parseLineItems(lineItems);
      updateData.lineItems = parsedItems;
      updateData.amount = computeAmount(parsedItems);
    }
    if (req.file) updateData.receipt = (req.file as any).path;

    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, user: req.user!.id },
      updateData,
      { new: true },
    );

    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense updated", expense });
  } catch (err) {
    console.error(err);
    res
      .status(400)
      .json({ message: err instanceof Error ? err.message : "Server error" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user!.id,
    });
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
