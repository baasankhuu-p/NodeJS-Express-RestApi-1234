const MyError = require("../utils/myError");
const jwt = require("jsonwebtoken");
const asyncHandler = require('./asyncHandler');
const Users = require("../Models/register")
exports.protect = asyncHandler(async(req,res,next) => {
    if(!req.headers.authorization){
        throw new MyError('Энэ үйлдлийг хийхэд таны эрх хүрэхгүй байна',400)
    }
    const token = req.headers.authorization.split(" ")[1];
    if(!token){
        throw new MyError('Токен байхгүй байна',401)
    }
    const ObjToken = jwt.verify(token,process.env.JWT_AMAZON_SECRET);
    req.user = ObjToken.id;
    req.role = ObjToken.roler;
    next();
});

exports.authorizer = (...roler) =>{
    return(req,res,next) => {
        if(!roler.includes(req.role)){
            throw new MyError('Таны эрх ['+req.role+'] энэ үйлдлийг хийх боломжгүй',403);
        }
        next();
    }
}