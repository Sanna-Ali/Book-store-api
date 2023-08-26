const express = require("express");
const router = express.Router();
const Joi = require("joi");
const asyncHandler = require("express-async-handler");
const { Author } = require("../models/Author");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");
const {
  createAuthor,
  getAuther,
  getoneAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/author");
// get
router.get("/", getAuther);

//post
router.post("/", createAuthor);
// get id
router.get("/:id", getoneAuthor);
//put
router.put("/:id", updateAuthor);
//delete
router.delete("/:id", deleteAuthor);
module.exports = router;
