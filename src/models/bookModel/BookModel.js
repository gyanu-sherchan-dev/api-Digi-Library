import BookSchema from "./BookSchema.js";

//get book
export const getBookByIsbn = (isbn) => {
  return BookSchema.findOne({ isbn });
};

//addbook
export const addBook = (bookInfo) => {
  return BookSchema(bookInfo).save();
};
