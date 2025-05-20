import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_CONNECT);
    console.log("✅ Connected to database");
  } catch (err) {
    console.error("❌ Failed to connect to database:", err.message);
    process.exit(1); // Exit the app on DB connection failure
  }
}

export default connectToDb;
