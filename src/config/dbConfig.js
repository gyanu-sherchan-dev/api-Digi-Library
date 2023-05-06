import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      return console.log(
        "Make sure environment variable MONGO_URL has mongodb connection link"
      );
    }
    const conn = await mongoose.connect(process.env.MONGO_URL);
    conn && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
