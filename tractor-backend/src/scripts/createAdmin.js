import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const username = "admin";
    const password = "admin123"; // change later if needed

    const exists = await Admin.findOne({ username });
    if (exists) {
      console.log("⚠️ Admin already exists");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.create({
      username,
      passwordHash,
    });

    console.log("✅ Admin created successfully");
    console.log("Username: admin");
    console.log("Password: admin123");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
};

createAdmin();
