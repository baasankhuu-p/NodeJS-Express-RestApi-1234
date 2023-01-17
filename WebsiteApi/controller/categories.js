const Category = require("../Models/Category");
const MyError = require("../utils/myError");
const color = require('colors');
const pagenate = require('../utils/paginate');
const path = require('path')

const asyncHandler = require('../middleware/asyncHandler')
exports.getCategories = asyncHandler(async(req, res, next) => {
  
  console.log("== {query data} ==>".rainbow,req.query);
  const select = req.query.select || {};
  const sort = req.query.sort || {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  ["select","sort","page","limit"].forEach( el => delete req.query[el])
  
  //pagenation
  
  const pagenation = await pagenate(page, limit, Category);
  const category = await Category.find(req.query,select)
                                  .sort(sort)
                                  .skip(pagenation.start-1)
                                  .limit(limit);
    res.status(200).json({
      success: true, 
      data: category,
      pagenation,
      
    });
});

exports.getCategory = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id).populate('books');
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
    const category = await Category.findById(req.params.id);
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    category.remove();
    res.status(200).json({
      success: true,
      data: category,
    });
});

//file upload api
exports.UploadCategoryPhoto = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.params.id);
    if(!category){
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    const file = req.files.file;
    //file type check
    if(!file.mimetype.startsWith("image")){
      throw new MyError(`Зураг оруулна уу ..`,400)
    };
    //file size check
    if(file.size>process.env.IMAGE_SIZE){
      throw new MyError(`Зурагны хэмжээ 20мб-с хэтэрсэн байна ..`,400)
    }
    file.name=`photo_`+req.params.id+path.parse(file.name).ext;
    file.mv(`${process.env.CATEGORY_PHOTO_FOLDER_PATH}/${file.name}`,err=>{
      if(err){
        throw new MyError(`Зураг оруулах явцад алдаа гарлаа ..`,400);
      }
    })
    category.photo = file.name;
    category.save();
    return res.status(200).json({
      success: true,
      data:file.name
    })
});
