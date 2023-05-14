import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { ERROR } from "./src/Constant.js";

const app = express();
const PORT = process.env.NODE_ENV || 8000;

//connecting to DB
import { connectDB } from "./src/config/dbConfig.js";

connectDB();

//middlewares
app.use(express.json()); // to parse the data that coming on post method into req.body, without this we do not have data coming
app.use(cors());

//api routers
import userRouter from "./src/routers/UserRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import transactionRouter from "./src/routers/TransactionRouter.js";
import { isAuth } from "./src/middlewares/authMiddlewares.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", isAuth, bookRouter);
app.use("/api/v1/transaction", isAuth, transactionRouter);

//all uncaught request
app.use("*", (req, res, next) => {
  res.json({
    message: "Request resource not found",
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error.message);
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
