const Books = require("../Models/book");
const Category = require("../Models/Category");
const MyError = require("../utils/myError");
const asyncHandler = require('../middleware/asyncHandler');
const path = require('path');
const { findById } = require("../Models/book");
const paginate = require('../utils/paginate');
//api/v1/books
exports.getBooks = asyncHandler(async(req, res, next) => {
    
  console.log("== {query data} ==>".rainbow,req.query);
  const select = req.query.select || {};
  const sort = req.query.sort || {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  ["select","sort","page","limit"].forEach( el => delete req.query[el])
  
  //pagenation
  
  const pagenation = await paginate(page, limit, Books);
  //deer ajilj ehelsn query-g huleegd duushaar doosh huselt shidne
    const books = await Books.find(req.query,select).populate({
      path:'category',
      select:'name averagePrice'
    })
    .sort(sort)
    .skip(pagenation.start-1)
    .limit(limit);
      res.status(200).json({
        success: true,
        count: books.length, 
        data: books,
        pagenation
      });
  });

  //ap/v1/categories/:categoryId/books
exports.getCategoryBooks = asyncHandler(async(req, res, next) => {
    
  console.log("== {query data} ==>".rainbow,req.query);
  const select = req.query.select || {};
  const sort = req.query.sort || {};
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  ["select","sort","page","limit"].forEach( el => delete req.query[el])
  
  //pagenation
  
  const pagenation = await paginate(page, limit, Books);
  //deer ajilj ehelsn query-g huleegd duushaar doosh huselt shidne
  const books = await Books.find({...req.query, category: req.params.categoryId},select)
  .sort(sort)
  .skip(pagenation.start-1)
  .limit(limit);
    res.status(200).json({
      success: true,
      count: books.length, 
      data: books,
      pagenation
    });
});
  
exports.getBook = asyncHandler(async(req, res, next) => {
    const book = await Books.findById(req.params.id);
    if(!book)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай ном олдсонгүй ..`,400)
    }
    res.status(200).json({
      success: true,
      data: book,
    });
});

exports.updateBooks = asyncHandler(async(req, res, next) => {
  const book = await Books.findByIdAndUpdate(req.params.id, req.body,{
    new: true,//Шинэчлэгдсэн мэдээллийг өгнө
    runValidators: true,//Баз үүсгэж байхдаа гаргаж байасн шалгалтыг бас шалгаж өгөөрэй гэж хэлж өгнө,
  });
  if(!book)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай ном олдсонгүй ..`,400)
    }
    res.status(200).json({
      success: true,
      data: book,
    });
});


exports.deleteBook = asyncHandler(async(req, res, next) => {
  const book = await Books.findById(req.params.id);
  if(!book)
  {
    throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
  }
  book.remove();
  res.status(200).json({
    success: true,
    data: book,
  });
});

exports.createBook = asyncHandler(async(req, res, next) => {
    const category = await Category.findById(req.body.category);
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    const book = await Books.create(req.body);
    return res.status(200).json({
      success: true,
      data: book,
    });
  
});
//file upload api
exports.uploadBookPhoto = asyncHandler(async(req, res, next) => {
    const book = await Books.findById(req.params.id);
    if(!book)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
    const file = req.files.file;
    //file type check
    if(!file.mimetype.startsWith("image")){
      throw new MyError(`Та зураг оруулна уу ..`,400)
    }
    //file size check
    console.log("Size==>",process.env.IMAGE_SIZE)
    if(file.size>process.env.IMAGE_SIZE){
      throw new MyError(`Таны зурагны хэмжээ 20mb хэтэрч болохгүй ..`,400)
    }
    file.name="photo_"+req.params.id+path.parse(file.name).ext;
    file.mv(`${process.env.BOOK_PHOTO_FOLDER_PATH}/${file.name}`,err =>{
      if(err){
        throw new MyError(`оруулах явцад алдаа гарлаа ..`,400)
      }
    })
    book.photo = file.name;
    book.save();
    return res.status(200).json({
      success: true,
      data: file.name
    })
    res.end()
  });