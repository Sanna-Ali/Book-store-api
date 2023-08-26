const express = require("express");
const {
  getForgetPassword,
  sendForgetPasswordLink,
  getResetPasswordView,
  resetPasswordView,
} = require("../controllers/passwordController");
const router = express.Router();
//password/forgot-password
router
  .route("/forgot-password")
  .get(getForgetPassword)
  .post(sendForgetPasswordLink);
// password/reset-password/:userId/:token
router
  .route("/reset-password/:userId/:token")
  .get(getResetPasswordView)
  .post(resetPasswordView);
module.exports = router;
