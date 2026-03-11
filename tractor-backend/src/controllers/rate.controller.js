import Rate from "../models/Rate.js";

// ➕ Add or Update rate
export const upsertRate = async (req, res) => {
  try {
    const { workType, ratePerAcre } = req.body;

    if (!workType || !ratePerAcre) {
      return res.status(400).json({ message: "All fields required" });
    }

    const rate = await Rate.findOneAndUpdate(
      { workType },
      { ratePerAcre },
      { new: true, upsert: true }
    );

    res.json(rate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Get all rates
export const getRates = async (req, res) => {
  try {
    const rates = await Rate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 📄 Get rate by work type
export const getRateByType = async (req, res) => {
  try {
    const { workType } = req.params;

    const rate = await Rate.findOne({ workType });
    if (!rate) {
      return res.status(404).json({ message: "Rate not found" });
    }

    res.json(rate);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
