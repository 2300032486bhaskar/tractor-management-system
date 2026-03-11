import Work from "../models/Work.js";
import Payment from "../models/Payment.js";
import Expense from "../models/Expense.js";

/* ================= DASHBOARD SUMMARY ================= */

export const dashboardSummary = async (req, res) => {
  try {
    const works = await Work.find();
    const payments = await Payment.find();
    const expenses = await Expense.find();

    /* ---------- TOTALS ---------- */

    const totalWorkValue = works.reduce(
      (sum, w) => sum + (Number(w.totalAmount) || 0),
      0
    );

    const totalPaid = payments.reduce(
      (sum, p) => sum + (Number(p.amount) || 0),
      0
    );

    const totalPending = totalWorkValue - totalPaid;

    const totalExpense = expenses.reduce(
      (sum, e) => sum + (Number(e.amount) || 0),
      0
    );

    const totalProfit = totalWorkValue - totalExpense;

    /* ---------- DATE CALCULATIONS ---------- */

    const now = new Date();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const todayCollection = payments
      .filter(p => p.date && new Date(p.date) >= startOfToday)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const monthCollection = payments
      .filter(p => p.date && new Date(p.date) >= startOfMonth)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const yearCollection = payments
      .filter(p => p.date && new Date(p.date) >= startOfYear)
      .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    res.json({
      totalWorkValue,
      totalPaid,
      totalPending,
      totalExpense,
      totalProfit,
      todayCollection,
      monthCollection,
      yearCollection,
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
};


/* ================= MONTHLY REPORT (FOR CHARTS) ================= */

export const monthlyReport = async (req, res) => {
  try {
    const works = await Work.find();
    const expenses = await Expense.find();

    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];

    const report = months.map((month, index) => {
      const revenue = works
        .filter(w => new Date(w.createdAt).getMonth() === index)
        .reduce((sum, w) => sum + (Number(w.totalAmount) || 0), 0);

      const expense = expenses
        .filter(e => new Date(e.createdAt).getMonth() === index)
        .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

      return {
        month,
        revenue,
        expense,
        profit: revenue - expense,
      };
    });

    res.json(report);

  } catch (err) {
    console.error("Monthly report error:", err);
    res.status(500).json({ message: "Monthly report error" });
  }
};
