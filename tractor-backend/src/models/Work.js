import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farmer",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Driver",
    },
    machineName: {
      type: String,
      required: true,
      trim: true,
    },
    acres: {
      type: Number,
      required: true,
    },
    ratePerAcre: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema);
