const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const connectDB = require("./config/db");

// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });

var morgan = require("morgan");
const logger = require("./middleware/logger");
const ErrorHandler = require("./middleware/error.js")
const colors = require('colors');

// Router оруулж ирэх
const categoriesRoutes = require("./routes/categories");

const app = express();

connectDB();


// create a write stream (in append mode)
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});


//Body Parser - Энэ нь шинээр req ирхэд express.н json-д өгөх гэж
app.use(express.json());

app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use("/api/v1/categories", categoriesRoutes);
//err middleware
app.use(ErrorHandler)
const server = app.listen(
  process.env.PORT,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `.rainbow)
);

//process.on Event
//unhandledRejection - Алдааны Event
//Universal err
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});