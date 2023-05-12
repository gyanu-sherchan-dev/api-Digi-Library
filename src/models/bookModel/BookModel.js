import BookSchema from "./BookSchema.js";

//get book
export const getBookByIsbn = (isbn) => {
  return BookSchema.findOne({ isbn });
};

//addbook
export const addBook = (bookInfo) => {
  return BookSchema(bookInfo).save();
};

//get all books
export const getAllBooks = () => {
  return BookSchema.find();
};

//borrow books
export const getBookById = (_id) => {
  return BookSchema.findById(_id);
};

export const findBookAndUpdate = (_id, obj) => {
  return BookSchema.findByIdAndUpdate(_id, obj, { new: true }); //new:true will send us the latest update from the Schema, since we are adding userId in BorrowedBy in Schema. if it is not written then for latest data you have to keep refreshing
};

//delete books
export const findBookAndDelete = (_id) => {
  return BookSchema.findByIdAndDelete(_id);
};
