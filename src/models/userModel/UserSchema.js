import mongoose from "mongoose";
import { ACTIVE } from "../../Constant.js";

const userSchema = new mongoose.Schema(
  {
    status: {
      //this status parameter because, when we insert any data, we want the status of the data active automatically.
      type: String,
      default: ACTIVE,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: 1, // index will help your search query faster in future, when you index in database, it will take your data, and put into the index tabel, it will create the another table on top of our table, so when you put the tabel, it will put item in the sequence order, when you put in the sequence do you want to do sequence in A-Z order or Z-A || basically acending or decending order, so index:1 means acending order and -1 means decending order. Here does not really matter acending or decending because it gonna be random email, but we have provide something, so that we provide 1.
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//lets make the model and export that

export default mongoose.model("User", userSchema);
