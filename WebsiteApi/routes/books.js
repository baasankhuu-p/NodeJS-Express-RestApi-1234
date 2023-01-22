const express = require("express");
const {protect, authorizer} = require("../middleware/protect")
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
  .post(protect,createBook);
router.route("/:id")
  .get(getBook)
  .put(protect,authorizer("admin","operator"),updateBooks)
  .delete(protect,authorizer("admin"),deleteBook);
router.route("/:id/photo")
  .put(protect,authorizer("admin","operator"),uploadBookPhoto)
module.exports = router;