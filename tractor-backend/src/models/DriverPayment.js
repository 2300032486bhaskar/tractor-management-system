import mongoose from "mongoose";

const driverPaymentSchema = new mongoose.Schema(
  {
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
      required: true,
    },
    year: { type: Number, required: true },
    amount: { type: Number, required: true },
    mode: { type: String, default: "cash" },
    notes: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("DriverPayment", driverPaymentSchema);
