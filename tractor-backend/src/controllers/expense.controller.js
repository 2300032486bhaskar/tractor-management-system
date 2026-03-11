import Expense from "../models/Expense.js";
import mongoose from "mongoose";

/* =============================
   ADD EXPENSE
============================= */
export const addExpense = async (req, res) => {
  try {
    const { category, amount, notes } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "Category is required",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const expense = await Expense.create({
      category,
      amount: Number(amount),
      notes,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.error("Add Expense Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =============================
   GET ALL EXPENSES
============================= */
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("Fetch Expense Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =============================
   DELETE EXPENSE
============================= */
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid expense ID",
      });
    }

    await Expense.findByIdAndDelete(id);

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Delete Expense Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};