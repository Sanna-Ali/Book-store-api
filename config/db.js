const mongoose = require("mongoose");
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("connected");
    });
  } catch (error) {
    console.log("no connected");
  }
};
//
//   mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//       console.log("connected");
//     })
//     .catch(() => {
//       console.log("no connected");
//     });
// ///git init -*
module.exports = connectToDb;
