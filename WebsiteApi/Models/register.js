const  mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [
            true,['Хэрэглэгчийн нэрийг оруулна уу']
        ],
        minLength:[3,'Хэрэглэгчийн нэр хэт богино байна'],
        trim: true
    },
    email:{
        type: String,
        required: [
            true,'Хэрэглэгч мэйл ээ оруулна уу'
        ],
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Мейл буруу байна'
        ],
        unique: true
    },
    roler:{
        type: String,
        required:[true,'Та хэрэглэгчийн эрхээ оруулна уу'],
        enum: ["user","operator"],
        default:"user"
    },
    password:{
        type: String,
        minLength: [4,'Таны нууц үг хэт богино байна'],
        required:[true,'Та нууц үгээ оруулна уу'],
        select: false
    },
    ResetPassToken: String,
    ResetPassExp: String,
    createAt:{
        type: Date,
        default: Date.now,
    }

});

UserSchema.pre("save",async function(){
    //passiig oilgomjgui blgj oorchlnoo ingsneer hack-s baga zrg secure hgdj ognoo
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})
//JWT
UserSchema.methods.getJsonWebToken = function (){
    const token =JWT.sign(
        {
            id: this._id,
            roler: this.roler
        },
        process.env.JWT_AMAZON_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRESIN
        });
        return token;
}
//User login pass check
UserSchema.methods.CheckPass = async function(pass) {
    return await bcrypt.compare(pass,this.password);
}
module.exports = mongoose.model("Users",UserSchema)