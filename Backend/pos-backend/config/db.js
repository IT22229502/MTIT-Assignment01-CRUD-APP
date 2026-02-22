import mongoose from "mongoose";

const connectDB = async () => {
  
  // Checking if the MONGO_URI exists before trying to connect
  if (!process.env.MONGO_URI) {
    console.error("❌ FATAL ERROR: MONGO_URI is missing in the .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;