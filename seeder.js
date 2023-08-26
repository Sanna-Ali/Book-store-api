const Book = require("./models/BookModel");
const { Author } = require("./models/Author");
const { books, authors } = require("./data");
const connectToDb = require("./config/db");
const { deleteMany } = require("./models/BookModel");
require("dotenv").config();
// connection to db
connectToDb();
// import books
const importBooks = async () => {
  try {
    await Book.insertMany(books);
    console.log("book imported");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
// import author
const importAuthor = async () => {
  try {
    await Author.insertMany(authors); //insertMany(authors);
    console.log("author import");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
//remove books
const removeBooks = async () => {
  try {
    await Book.deleteMany();
    console.log("remove");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
if (process.argv[2] === "-import") {
  importBooks();
} else if (process.argv[2] === "-remove") {
  removeBooks();
} else if (process.argv[2] === "-import_authors") {
  importAuthor();
}
