import Payment from "../models/Payment.js";
import Farmer from "../models/Farmer.js";
import mongoose from "mongoose";

/**
 * Add payment for farmer
 */
export const addPayment = async (req, res) => {
  try {
    const { farmerId, amount, mode, date, notes } = req.body;

    // Validate farmer ID
    if (!mongoose.Types.ObjectId.isValid(farmerId)) {
      return res.status(400).json({ message: "Invalid farmer ID" });
    }

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const payment = await Payment.create({
      farmerId,
      amount,
      mode,
      date: date || new Date(),
      notes,
    });

    res.status(201).json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Get payments for a farmer
 */
export const getPaymentsByFarmer = async (req, res) => {
  try {
    const { farmerId } = req.params;

    const payments = await Payment.find({ farmerId }).sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
export const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Payment ID required" });
    }

    const deleted = await Payment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generatePaymentReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("farmerId");
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${payment._id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Payment Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Receipt ID: ${payment._id}`);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`);
    doc.moveDown();

    doc.text(`Farmer Name: ${payment.farmerId.name}`);
    doc.text(`Mobile: ${payment.farmerId.mobile}`);
    doc.moveDown();

    doc.text(`Amount Paid: ₹${payment.amount}`);
    doc.text(`Payment Mode: ${payment.mode}`);
    doc.text(`Notes: ${payment.notes || "-"}`);

    doc.moveDown();
    doc.text("Thank you for your business.", { align: "center" });

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


