const asyncHandler = require("../middleware/asyncHandler")
const MyError = require("../utils/myError");
const Users = require("../Models/register")
//create user
exports.registerUser = asyncHandler(async(req,res,next) => {
    const user = await Users.create(req.body);
    const jwt=user.getJsonWebToken();
    console.log(jwt);
    res.status(200).json({
        success: true,
        jwt, 
        data: user
    })
})