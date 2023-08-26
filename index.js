const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/error");
const connectToDb = require("./config/db");
require("dotenv").config();
const app = express();
connectToDb();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(logger);
app.use("/a", require("./routes/auth"));
app.use("/b", require("./routes/book"));
app.use("/auth", require("./routes/AuthRL"));
app.use("/api/user", require("./routes/user"));
app.use("/password", require("./routes/password"));
app.use(notFound);
// error handler
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV}mode on port ${PORT}`
  );
});
