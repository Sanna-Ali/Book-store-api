const asyncHandler = require("express-async-handler");
const {
  validateCreateBook,
  validateUpdateBook,
} = require("../models/BookModel");
const Book = require("../models/BookModel");
const getAllBooks = asyncHandler(async (req, res) => {
  let books;
  const { minPrice, maxPrice } = req.query;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    }).populate("author", ["_id", "firstName", "lastName"]);
  } else {
    books = await Book.find().populate("author", [
      "_id",
      "firstName",
      "lastName",
    ]);
  }

  res.status(200).json(books);
});
const getbookbyid = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
});
const createbook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message); //

  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    cover: req.body.cover,
  });
  const result = await book.save();
  res.status(201).send(result);
});
const updatebook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  res.status(200).json(updatedBook);
});
const deletebook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  res.json("deleted");
});
module.exports = {
  getAllBooks,
  getbookbyid,
  createbook,
  updatebook,
  deletebook,
};
