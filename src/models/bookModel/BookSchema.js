import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    borrowedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timeStamp: true,
  }
);

export default mongoose.model("Books", bookSchema);
