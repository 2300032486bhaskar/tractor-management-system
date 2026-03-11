import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    joiningYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Driver", driverSchema);
