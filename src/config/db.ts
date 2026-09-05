import mongoose from "mongoose";

export async function connectDB() {
  console.log("Attempting MongoDB connection...");
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Failed");
    console.log(error);
  }
}


export default connectDB;
