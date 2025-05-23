// createAdmin.js
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/User.js";

const createAdmin = async () => {
  await mongoose.connect("mongodb+srv://sandeep9682980:ObcDnGOMs0WwEeTj@cluster0.knv13.mongodb.net/giit-lms");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = new User({ username: "admin", password: hashedPassword });
  await admin.save();
  console.log("Admin created");
  process.exit();
};

createAdmin();
