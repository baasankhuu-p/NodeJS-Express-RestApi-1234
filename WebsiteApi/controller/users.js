const asyncHandler = require("../middleware/asyncHandler")
const MyError = require("../utils/myError");
const Users = require("../Models/register");
const paginate = require('../utils/paginate');
const { findOne } = require("../Models/register");
//create user
exports.registerUser = asyncHandler(async(req,res,next) => {
    const user = await Users.create(req.body);
    const token=user.getJsonWebToken();
    res.status(200).json({
        success: true,
        token, 
        data: user
    })
})

exports.loginUser = asyncHandler(async(req,res,next) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new MyError('Имейл эсвэл нууц үгээ оруулна уу', 400);
    }
    const user = await Users.findOne({email}).select("+password");
    if(!user){
        throw new MyError('Имейл эсвэл нууц үг буруу байна', 400);
    }
    
    const ok = await user.CheckPass(password);
    if(!ok){
        throw new MyError('Имейл эсвэл нууц үг буруу байна', 400);
    }
    res.status(200).json({
        success: true,
        token: user.getJsonWebToken(), 
        user: user,
        login: true
    })
})

exports.getUsers = asyncHandler(async(req, res, next) => {
  
    const select = req.query.select || {};
    const sort = req.query.sort || {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    ["select","sort","page","limit"].forEach( el => delete req.query[el])
    
    //pagenation
    
    const pagenation = await paginate(page, limit, Users);
    const user = await Users.find(req.query,select)
                                    .sort(sort)
                                    .skip(pagenation.start-1)
                                    .limit(limit);
      res.status(200).json({
        success: true, 
        data: user,
        pagenation,
        
      });
  });
  
  exports.getUser = asyncHandler(async(req, res, next) => {
      const user = await Users.findById(req.params.id);
      if(!user)
      {
        throw new MyError(`${req.params.id}-ийм ID-тай хэрэглэгч олдсонгүй ..`,400)
      }
      res.status(200).json({
        success: true,
        data: user,
      });
  });
  
  exports.createUser = asyncHandler(async(req, res, next) => {
    const user = await Users.create(req.body);
      return res.status(200).json({
              success: true,
              data: user,
            });
  });
  
  exports.updateUser = asyncHandler(async(req, res, next) => {
      const user = await Users.findByIdAndUpdate(req.params.id, req.body,{
        new: true,//Шинэчлэгдсэн мэдээллийг өгнө
        runValidators: true,//Баз үүсгэж байхдаа гаргаж байасн шалгалтыг бас шалгаж өгөөрэй гэж хэлж өгнө,
      });
      if(!user)
      {
        throw new MyError(`${req.params.id}-ийм ID-тай хэрэглэгч олдсонгүй ..`,400)
      }
      res.status(200).json({
        success: true,
        data: user,
      });
  });
  
  exports.deleteUser = asyncHandler(async(req, res, next) => {
      const user = await Users.findById(req.params.id);
      if(!user)
      {
        throw new MyError(`${req.params.id}-ийм ID-тай хэрэглэгч олдсонгүй ..`,400)
      }
      user.remove();
      res.status(200).json({
        success: true,
        data: user,
      });
  });