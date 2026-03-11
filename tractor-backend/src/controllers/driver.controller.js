import mongoose from "mongoose";
import Driver from "../models/Driver.js";
import Work from "../models/Work.js";

/* ================= GET ALL DRIVERS ================= */
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find().sort({ createdAt: -1 });
    res.json(drivers);
  } catch (err) {
    console.error("Get drivers error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= CREATE DRIVER ================= */
export const createDriver = async (req, res) => {
  try {

    const { name, mobile, joiningYear } = req.body;

    const driver = new Driver({
      name,
      mobile,
      joiningYear
    });

    await driver.save();

    res.status(201).json(driver);

  } catch (err) {
    console.error("Create driver error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= DRIVER LEDGER ================= */
export const getDriverLedger = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid driver ID",
      });
    }

    const works = await Work.find({ driverId: id })
      .populate("farmerId", "name")
      .sort({ createdAt: -1 });

    const totalEarnings = works.reduce(
      (sum, w) => sum + (w.driverShare || 0),
      0
    );

    res.json({
      works,
      totalEarnings,
    });
  } catch (err) {
    console.error("Driver ledger error:", err);
    res.status(500).json({ message: "Server error" });
  }
};