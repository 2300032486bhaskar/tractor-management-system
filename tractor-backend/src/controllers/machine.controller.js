import Machine from "../models/Machine.js";

export const addMachine = async (req, res) => {
  try {
    const { name, defaultRatePerAcre } = req.body;

    const machine = await Machine.create({
      name,
      defaultRatePerAcre,
    });

    res.status(201).json(machine);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMachines = async (req, res) => {
  try {
    const machines = await Machine.find({ isActive: true });
    res.json(machines);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
