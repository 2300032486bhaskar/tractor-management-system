import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });

    // Debug logs
    console.log("Admin from DB:", admin);
    console.log("Entered username:", username);
    console.log("Entered password:", password);

    // If admin not found
    if (!admin) {
      console.log("Admin not found in DB");
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password with hash
    const match = await bcrypt.compare(password, admin.passwordHash);

    console.log("Stored hash:", admin.passwordHash);
    console.log("Password match result:", match);

    // If password doesn't match
    if (!match) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful");

    res.json({
      token,
      adminId: admin._id,
    });

  } catch (err) {
    console.error("Login error:", err);

    res.status(500).json({
      message: "Server error",
    });
  }
};