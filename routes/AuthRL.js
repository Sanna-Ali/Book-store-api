const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

// const { result } = require("@hapi/joi/lib/base");
router.post(
  //validateRegisterUser
  "/register",
  register
);
//login
router.post("/login", login);
module.exports = router;
