import Payment from "../models/Payment.js";
import Work from "../models/Work.js";

export const getReportSummary = async (req, res) => {
  try {
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    // Monthly collection
    const monthPayments = await Payment.find({
      date: { $gte: startOfMonth },
    });

    const monthCollection = monthPayments.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    // Yearly collection
    const yearPayments = await Payment.find({
      date: { $gte: startOfYear },
    });

    const yearCollection = yearPayments.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    // Total work value
    const works = await Work.find();
    const totalWork = works.reduce(
      (sum, w) => sum + w.totalAmount,
      0
    );

    res.json({
      monthCollection,
      yearCollection,
      totalWork,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
