import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true, // ✅ confirmed by you
      trim: true,
    },
    village: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["external", "internal"], // internal = uncle’s land
      default: "external",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Farmer", farmerSchema);
