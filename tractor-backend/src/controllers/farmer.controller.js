import Work from "../models/Work.js";
import Payment from "../models/Payment.js";
import Farmer from "../models/Farmer.js";
import mongoose from "mongoose";

/* =====================================
   ADD FARMER
===================================== */
export const addFarmer = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    if (!name || !mobile) {
      return res.status(400).json({
        message: "Name and mobile required",
      });
    }

    const existing = await Farmer.findOne({ mobile });

    if (existing) {
      return res.status(400).json({
        message: "Farmer already exists",
      });
    }

    const farmer = await Farmer.create({
      name,
      mobile,
    });

    res.status(201).json(farmer);

  } catch (err) {
    console.error("Add Farmer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/* =====================================
   GET ALL FARMERS
===================================== */
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().sort({ createdAt: -1 });
    res.json(farmers);
  } catch (err) {
    console.error("Get Farmers Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================
   SEARCH FARMER
===================================== */
export const searchFarmer = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json([]);
    }

    const farmers = await Farmer.find({
      name: { $regex: query, $options: "i" },
    });

    res.json(farmers);
  } catch (err) {
    console.error("Search Farmer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================
   FARMER LEDGER + RISK ENGINE
===================================== */
export const getFarmerLedger = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid farmer ID" });
    }

    const farmer = await Farmer.findById(id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const works = await Work.find({ farmerId: id }).sort({ createdAt: -1 });
    const payments = await Payment.find({ farmerId: id }).sort({ createdAt: -1 });

    const totalWork = works.reduce(
      (sum, w) => sum + (w.totalAmount || 0),
      0
    );

    const totalPaid = payments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    const rawPending = totalWork - totalPaid;
    const pending = rawPending < 0 ? 0 : rawPending;

    /* ===== RISK ===== */
    let riskScore = 0;

    if (totalWork > 0) {
      const pendingRatio = pending / totalWork;
      riskScore = Math.round(pendingRatio * 100);
    }

    riskScore = Math.min(100, Math.max(0, riskScore));

    let riskCategory = "Green";
    if (riskScore >= 70) riskCategory = "Red";
    else if (riskScore >= 40) riskCategory = "Yellow";

    /* ===== CREDIT LIMIT ===== */
    const averagePayment =
      payments.length > 0 ? totalPaid / payments.length : 0;

    const creditLimit = Math.max(
      0,
      averagePayment * 2 - pending
    );

    res.json({
      farmer,
      works,
      payments,
      totalWork,
      totalPaid,
      pending,
      riskScore,
      riskCategory,
      creditLimit,
    });
  } catch (err) {
    console.error("Ledger Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================
   DELETE FARMER
===================================== */
export const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid farmer ID" });
    }

    await Farmer.findByIdAndDelete(id);
    await Work.deleteMany({ farmerId: id });
    await Payment.deleteMany({ farmerId: id });

    res.json({ message: "Farmer deleted successfully" });
  } catch (err) {
    console.error("Delete Farmer Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};