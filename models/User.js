const mongoose = require("mongoose");
const Joi = require("joi");
//const { boolean } = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 33,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 33,
  },
  password: { type: String, required: true, minlength: 8, maxlength: 1024 },
  isAdmin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY
  );
};
const User = mongoose.model("User", UserSchema);
validateRegisterUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(33).required().email(),
    username: Joi.string().trim().min(3).max(33).required(),
    password: Joi.string().trim().min(8).max(1024).required(),
    //isAdmin: Joi.bool(),
  });
  return schema.validate(data);
};
validateUpdateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(33).email(),
    username: Joi.string().trim().min(3).max(33),
    password: Joi.string().trim().min(8).max(1024),
    //isAdmin: Joi.bool(),
  });
  return schema.validate(data);
};
validateLoginUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(33).required().email(),

    password: Joi.string().trim().min(8).max(1024).required(),
  });
  return schema.validate(data);
};
module.exports = {
  User,
  validateLoginUser,
  validateUpdateUser,
  validateRegisterUser,
};
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTYxZDNiMWJhYzE0OTIwNTZhNTdiNCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzkxNzA4NzV9.aCIEdft6e47-l4DEjLZ0vP5BnOto6SJCMiByhI1uslc
