const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Category = require("./Models/Category");
const Book = require("./Models/book");

dotenv.config({ path: "./config/config.env" });

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const categories = JSON.parse(
    fs.readFileSync(__dirname + "/data/categories.json", "utf-8")
);
  
const books = JSON.parse(
  fs.readFileSync(__dirname + "/data/book.json", "utf-8")
);
  const importData = async () => {
    try {
      await Category.create(categories);
     await Book.create(books);
      console.log("Өгөгдлийг импортлолоо....".green.inverse);
    } catch (err) {
      console.log(err.red);
    }
  };
  
  const deleteData = async () => {
    try {
      await Category.deleteMany();
      await Book.deleteMany();
      console.log("Өгөгдлийг бүгдийг устгалаа....".red.inverse);
    } catch (err) {
      console.log(err.red.inverse);
    }
  };
  
  if (process.argv[2] == "-i") {
    importData();
  } else if (process.argv[2] == "-d") {
    deleteData();
  }