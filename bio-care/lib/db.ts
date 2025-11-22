import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ MONGO_URI is missing in environment variables");
  }

  try {
    const db = await mongoose.connect(uri);
    isConnected = !!db.connections[0].readyState;

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err);
    process.exit(1);
  }
}
