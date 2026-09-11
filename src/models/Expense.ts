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

export interface ExpenseLineItem {
  name: string;
  qty: number;
  unitPrice: number;
}

export interface Expense {
  _id: string;
  title: string;
  category: ExpenseCategory;
  date: string;
  paymentMethod?: PaymentMethod;
  notes?: string;
  lineItems: ExpenseLineItem[];
  amount: number;
  receipt?: string;
  createdAt: string;
}
