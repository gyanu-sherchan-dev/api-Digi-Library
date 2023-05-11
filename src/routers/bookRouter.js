import express from "express";
import { addBook, getBookByIsbn } from "../models/bookModel/BookModel.js";
import { ERROR, SUCCESS } from "../Constant.js";

const baseEP = "/api/v1/book";
const router = express.Router();

//add a book
router.post("/", async (req, res, next) => {
  try {
    const { isbn } = req.body;
    const bookExists = await getBookByIsbn(isbn);
    if (bookExists?._id) {
      return res.json({
        status: ERROR,
        message: "Book Already Exist",
      });
    }
    const book = await addBook(req.body);
    console.log(book);
    return book?._id
      ? res.json({
          status: SUCCESS,
          message: "Book successfully added",
        })
      : res.json({
          status: ERROR,
          message: "Unsuccessfull to add book",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
