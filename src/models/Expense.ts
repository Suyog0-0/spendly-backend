import mongoose, { Schema, Document } from "mongoose";

export type ExpenseCategory =
  | "Food & Dining"
  | "Transportation"
  | "Utilities"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Education"
  | "Other";

export type PaymentMethod = "Cash" | "Debit Card" | "Credit Card" | "eSewa";

export interface ILineItem {
  name: string;
  qty: number;
  unitPrice: number;
}

export interface IExpense extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  category: ExpenseCategory;
  date: Date;
  paymentMethod?: PaymentMethod;
  notes?: string;
  lineItems: ILineItem[];
  amount: number;
  receipt?: string;
}

const lineItemSchema = new Schema<ILineItem>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
});

const expenseSchema = new Schema<IExpense>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: [
        "Food & Dining",
        "Transportation",
        "Utilities",
        "Shopping",
        "Entertainment",
        "Health",
        "Education",
        "Other",
      ],
      required: true,
    },
    date: { type: Date, required: true },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Debit Card", "Credit Card", "eSewa"],
    },
    notes: { type: String },
    lineItems: { type: [lineItemSchema], required: true },
    amount: { type: Number, required: true },
    receipt: { type: String },
  },
  { timestamps: true }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;
