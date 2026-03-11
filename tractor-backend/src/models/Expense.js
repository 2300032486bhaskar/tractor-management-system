import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["diesel", "maintenance", "repair", "salary", "emi", "other"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);