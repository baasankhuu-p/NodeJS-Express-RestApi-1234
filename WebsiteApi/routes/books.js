const express = require("express");

const {
  getBooks,
  getBook,
  updateBooks,
  createBook,
  deleteBook,
  uploadBookPhoto
} = require("../controller/books");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/categories"
router.route("/")
  .get(getBooks)
  .post(createBook);
router.route("/:id")
  .get(getBook)
  .put(updateBooks)
  .delete(deleteBook);
router.route("/:id/photo")
  .put(uploadBookPhoto)
module.exports = router;
