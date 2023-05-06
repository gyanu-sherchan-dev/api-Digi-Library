import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { ERROR } from "./src/Constant.js";

const app = express();
const PORT = process.env.NODE_ENV || 8001;

//connecting to DB
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

//all uncaught request
app.use("*", (req, res, next) => {
  res.json({
    message: "Request resource not found",
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const errorCode = error.code || 500;
  res.status(errorCode).json({
    status: ERROR,
    message: error.message,
  });
});

//run the server
app.listen(PORT, (error) => {
  error
    ? console.log(error.message)
    : console.log(`server is runnig at http://localhost:${PORT}`);
});