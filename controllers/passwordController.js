const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
module.exports.getForgetPassword = asyncHandler((req, res) => {
  res.render("forgot-password");
});
module.exports.sendForgetPasswordLink = asyncHandler(async (req, res) => {
  //.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json("user not found");
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });
  const link = `http://localhost:3000/password/reset-password/${user._id}/${token}`;
  res.json({ message: "click on the link", resetPasswordLink: link });
});
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json("user not found");
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error);
    res.json("error");
  }
});
/// reset password //post
module.exports.resetPasswordView = asyncHandler(async (req, res) => {
  // todo validation
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json("user not found");
  }
  const secret = process.env.JWT_SECRET_KEY + user.password;
  try {
    jwt.verify(req.params.token, secret);
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    user.password = req.body.password;
    await user.save();
    res.render("success-password");
  } catch (error) {
    console.log(error);
    res.json("error");
  }
});
