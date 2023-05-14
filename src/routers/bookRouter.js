import express from "express";
import {
  addBook,
  findBookAndDelete,
  findBookAndUpdate,
  getAllBooks,
  getBookById,
  getBookByIsbn,
  getBorrowedBooks,
} from "../models/bookModel/BookModel.js";
import { ERROR, SUCCESS } from "../Constant.js";
import { getUserById } from "../models/userModel/UserModel.js";
import { postTransaction } from "../models/transaction/TransactionModel.js";

const baseEP = "/api/v1/book";
const router = express.Router();

//get books
router.get("/", async (req, res, next) => {
  try {
    const books = await getAllBooks();
    if (books) {
      return res.json({ books });
    }
    return;
  } catch (error) {
    next(error);
  }
});

//get borrowed books by specific users
router.get("/borrowedBooks", async (req, res, next) => {
  try {
    const books = await getBorrowedBooks(req.headers.authorization);
    return res.json(books);
  } catch (error) {
    next(error);
  }
});

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

//borrow book
router.post("/borrow", async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const { authorization } = req.headers;
    const book = await getBookById(bookId);
    const user = await getUserById(authorization);
    if (book?._id && user?._id) {
      if (book.borrowedBy.length) {
        return res.json({
          status: ERROR,
          message:
            "This book has already been borrowed and will available once it has been returned",
        });
      }

      const { isbn, thumbnail, title, author, year } = book;
      const transaction = await postTransaction({
        borrowedBy: {
          userId: user?._id,
          userName: user?.fName,
        },
        borrowedBook: {
          isbn,
          thumbnail,
          title,
          author,
          year,
        },
      });
      if (transaction?._id) {
        const updateBook = await findBookAndUpdate(bookId, {
          $push: { borrowedBy: user._id }, // Syntax to add userId to borrowedBy in Schema
        });

        return updateBook?._id
          ? res.json({
              status: SUCCESS,
              message: "You have borrowed this book !",
            })
          : res.json({
              status: ERROR,
              message: "Something went wrong, please try again later",
            });
      }
      return res.json({
        status: ERROR,
        message: "Something went wrong. Please try again later!",
      });
    }
  } catch (error) {
    next(error);
  }
});

//Return a book
router.patch("/return", async (req, res, next) => {
  try {
    const book = await getBookById(req.body._id);
    const user = await getUserById(req.headers.authorization);
    // console.log(book);

    if (book?._id && user?._id) {
      const updateBook = await findBookAndUpdate(book._id, {
        $pull: { borrowedBy: user._id },
      });
      console.log(updateBook);
      return updateBook?._id
        ? res.json({
            status: SUCCESS,
            message: "You have returned this book",
            updateBook,
          })
        : res.json({
            status: ERROR,
            message: "Unable to return book , please try again later",
          });
    }
  } catch (error) {
    next(error);
  }
});

//delete book
router.delete("/", async (req, res, next) => {
  try {
    const book = await getBookById(req.body.bookId);
    if (book?.borrowedBy.length) {
      return res.json({
        status: ERROR,
        message: "Unable to delete book. This book has not been returned yet !",
      });
    }
    const del = await findBookAndDelete(req.body.bookId);
    del?._id
      ? res.json({
          status: SUCCESS,
          message: "Book deleted Successfully",
        })
      : res.json({
          statu: ERROR,
          message: "Unable to delete Book",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
