import Work from "../models/Work.js";
import Farmer from "../models/Farmer.js";
import mongoose from "mongoose";

/* ===============================
   ADD WORK (Machine Based)
================================ */
export const addWork = async (req, res) => {
  try {
    const {
      farmerId,
      driverId,
      machineName,
      acres,
      ratePerAcre,
    } = req.body;

    /* ------------------ VALIDATION ------------------ */

    if (!farmerId || !machineName || !acres || !ratePerAcre) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({
        message: "Invalid farmer ID",
      });
    }

    if (driverId && !mongoose.Types.ObjectId.isValid(driverId)) {
      return res.status(400).json({
        message: "Invalid driver ID",
      });
    }

    const acresNumber = Number(acres);
    const rateNumber = Number(ratePerAcre);

    if (isNaN(acresNumber) || acresNumber <= 0) {
      return res.status(400).json({
        message: "Invalid acres value",
      });
    }

    if (isNaN(rateNumber) || rateNumber <= 0) {
      return res.status(400).json({
        message: "Invalid rate per acre",
      });
    }

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({
        message: "Farmer not found",
      });
    }

    /* ------------------ CALCULATION ------------------ */

    const totalAmount = acresNumber * rateNumber;

    /* ------------------ CREATE WORK ------------------ */

    const work = await Work.create({
      farmerId,
      driverId: driverId || null,
      machineName,
      acres: acresNumber,
      ratePerAcre: rateNumber,
      totalAmount,
    });

    res.status(201).json(work);

  } catch (err) {
    console.error("Add Work Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/* ===============================
   DELETE WORK
================================ */
export const deleteWork = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid work ID",
      });
    }

    const deleted = await Work.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Work not found",
      });
    }

    res.json({
      message: "Work deleted successfully",
    });

  } catch (err) {
    console.error("Delete Work Error:", err);
    res.status(500).json({
      message: "Server error",
    });
  }
};
