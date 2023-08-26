const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getAllBooks,
  getbookbyid,
  createbook,
  updatebook,
  deletebook,
} = require("../controllers/bookController");
const { put } = require("./auth");
////
router.route("/").get(getAllBooks).post(createbook);
router.route("/:id").get(getbookbyid).put(updatebook).delete(deletebook);
//get all
//router.get("/", getAllBooks);
//get one
//router.get("/:id", getbookbyid);
//create
//router.post("/", createbook);
// put //delete
//router.put("/:id", updatebook);
//delete
//router.delete("/:id", deletebook);
module.exports = router;
