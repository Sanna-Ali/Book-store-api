const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Author } = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const createAuthor = asyncHandler(
  async (req, res) => {
    // try {
    const auther = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await auther.save();
    if (result) {
      res.status(201).json(result);
    }
    //} catch (error) {
    //console.log(error);
    else {
      res.status(500).json({ message: "something went wrong" });
    }
  }
  //}
);
const getAuther = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  authorperpage = 2;
  // skip ignore //limit
  const authorlist = await Author.find()
    // page 1 auth 2
    .skip((pageNumber - 1) * authorperpage)
    .limit(authorperpage);
  //.sort({ firstName: -1 })
  // .select("firstName lastName -_id ");
  res.status(200).json(authorlist);

  console.log(error);
  res.status(500).json({ message: "something wrongft6" });
});
const getoneAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const updateAuthor = async (req, res) => {
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );
  res.status(200).json(author);
};
const deleteAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  }
};
module.exports = {
  createAuthor,
  getAuther,
  getoneAuthor,
  updateAuthor,
  deleteAuthor,
};
