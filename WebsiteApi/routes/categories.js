const express = require("express");

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  UploadCategoryPhoto
} = require("../controller/categories");

const {getCategoryBooks} = require('../controller/books');

const router = express.Router();
//"/api/v1/categories"
router.route("/")
  .get(getCategories)
  .post(createCategory);

router.route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);
router.route("/:id/photo")
  .put(UploadCategoryPhoto);
router.route("/:categoryId/books")
  .get(getCategoryBooks)
module.exports = router;
