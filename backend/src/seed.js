import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import User from "./models/user.js";

dotenv.config();

// Two users to seed. Passwords are hashed automatically by the
// userSchema pre("save") hook, so we create them via .save().
const users = [
  {
    name: "Site Admin",
    email: "admin@forgequantum.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Quality Manager",
    email: "quality@forgequantum.com",
    password: "user1234",
    role: "user",
  },
  {
    name: "Test User",
    email: "test@gmail.com",
    password: "Test@123",
    role: "user",
  },
];

const seed = async () => {
  try {
    await connectDB();

    for (const data of users) {
      // Idempotent: remove any existing user with the same email/name first
      await User.deleteOne({ email: data.email });
      const user = new User(data);
      await user.save();
      console.log(`✓ Seeded ${user.role.padEnd(5)}  ${user.email}`);
    }

    console.log(`\nDone. Seeded ${users.length} users.`);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seed();
