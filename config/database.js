import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If database is already connected, Don't connect again
  if (connected) {
    console.log("⚡️[DB]: MongoDB is already connected");
    return;
  }

  // Connect MongoDB
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log(`⚡️[DB]: MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(`❗[DB]: Error : `, error);
  }
};

export default connectDB;
