import mongoose from "mongoose";

const rateSchema = new mongoose.Schema(
  {
    workType: {
      type: String,
      required: true,
      unique: true, // ploughing, rotavator, harvesting, leveling
      lowercase: true,
      trim: true,
    },
    ratePerAcre: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Rate", rateSchema);
