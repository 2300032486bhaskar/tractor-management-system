import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
   const admin = await Admin.findOne({ username });

console.log("Admin from DB:", admin);
console.log("Entered password:", password);

if (!admin) {
  return res.status(401).json({ message: "Invalid credentials" });
}

const match = await bcrypt.compare(password, admin.passwordHash);

console.log("Password match:", match);
    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};