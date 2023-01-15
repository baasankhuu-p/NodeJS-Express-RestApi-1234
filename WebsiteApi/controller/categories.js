const Category = require("../Models/Category");
const MyError = require("../utils/myError");
const color = require('colors');
const asyncHandler = require('../middleware/asyncHandler')
exports.getCategories = asyncHandler(async(req, res, next) => {
  
  console.log(req.query);
  select = req.query.select || {};
  sort = req.query.sort || {};
  delete req.query.select,req.query.sort;
  console.log('deleted All',req.query);
    const category = await Category.find(req.query,select)
                                  .sort("-"+sort);
    res.status(200).json({
      success: true,
      data: category,
    });
});

exports.getCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    res.status(200).json({
      success: true,
      data: category,
    });
});

exports.createCategory = asyncHandler(async(req, res, next) => {
  //console.log("data: ",req.body)
    const category = await Category.create(req.body);
    return res.status(200).json({
            success: true,
            data: category,
          });
  
});

exports.updateCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body,{
      new: true,//Шинэчлэгдсэн мэдээллийг өгнө
      runValidators: true,//Баз үүсгэж байхдаа гаргаж байасн шалгалтыг бас шалгаж өгөөрэй гэж хэлж өгнө,
    });
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    res.status(200).json({
      success: true,
      data: category,
    });
});

exports.deleteCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    res.status(200).json({
      success: true,
      data: category,
    });
});
