const express = require("express");
const { protect } = require('../middleware/protect');
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
  .post(protect,createCategory);

router.route("/:id")
  .get(getCategory)
  .put(protect,updateCategory)
  .delete(protect,deleteCategory);
router.route("/:id/photo")
  .put(protect,UploadCategoryPhoto);
router.route("/:categoryId/books")
  .get(getCategoryBooks)
module.exports = router;
