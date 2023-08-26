const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const jwt = require("jsonwebtoken");
const updateuser = asyncHandler(async (req, res) => {
  // if (req.user.id !== req.params.id) {
  //   return res
  //     .status(403) //forrbidden
  //     .json(req.user.id);
  // }
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  console.log(req.headers);

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});
const getuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json("user not found");
  }
});
const getalluser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});
const deleteuser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleted");
  } else {
    res.status(404).json("not found");
  }
});
module.exports = { updateuser, deleteuser, getalluser, getuser, updateuser };
