import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // How long to try finding a suitable server
      connectTimeoutMS: 5000,         // TCP connect timeout
      socketTimeoutMS: 10000,         // How long a socket can stay idle before closing
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("Proceeding in offline/mock database mode...");
  }
};

export default connectDB;
