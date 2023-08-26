const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
  validateUpdateUser,
} = require("../models/User");
const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json("this user is already registered");
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    //isAdmin: req.body.isAdmin,
  });

  const result = await user.save();
  const token = user.generateToken();
  const { password, ...other } = result._doc;
  res.json({ token, ...other });
  //console.log(result._doc)
});
const login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("invalid email or password");
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json("invalid password or email");
  }
  const token = user.generateToken();
  const { password, ...other } = user._doc;
  res.status(200).json({ ...other, token });
  console.log();
});
module.exports = { register, login };
