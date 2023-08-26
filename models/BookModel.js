const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Author",
  },
  price: { type: Number, required: true, min: 0 },
  cover: { type: String, required: true, enum: ["soft cover", "hard cover"] },
});
const Book = mongoose.model("Book", BookSchema);
const validateCreateBook = (data) => {
  const Schema = Joi.object({
    title: Joi.string().trim().min(3).max(255).required(),
    author: Joi.string().required(),
    price: Joi.number().min(0), //number.required(),
    cover: Joi.string().valid("soft cover", "hard cover").required(),
  });
  return Schema.validate(data);
};
const validateUpdateBook = (data) => {
  const Schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string(),
    price: Joi.number(),
    cover: Joi.string().valid("soft cover", "hard cover"),
  });
  return Schema.validate(data);
};
module.exports = mongoose.model("Book", BookSchema);
module.exports.validateCreateBook = validateCreateBook;
module.exports.validateUpdateBook = validateUpdateBook;
//64106050387be27c23d1076b
