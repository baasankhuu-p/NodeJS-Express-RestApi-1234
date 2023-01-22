const mongoose = require("mongoose");
const color = require('colors');
const { transliterate , slugify } = require('transliteration');

const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [
            true,'Номын нэрийг оруулна уу',
        ],
        unique: true,
        trim:true,
        maxLength: [250, 'номын нэрний урт дээд тал нь 250 тэмдэгт байх ёстой'],
    },
    photo : {
        type: String,
        default: 'no-photo.jpg',
    },
    author:{
        type: String,
        required: [
            true,'зохиогчийн нэрийг оруулна уу',
        ],
        trim:true,
        maxLength: [50, 'зохиогчийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой'],
    },
    averageRating: {
        type: Number,
        min: [1,'Рэйтинг хамгийн багадаа 1 байх ёстой'],
        max: [10,'Рэйтинг хамгийн ихдээ 10 байх ёстой']
    },
    price: {
        type: Number,
        required: [true,'Номын үнийг оруулна уу'],
        min: [500,'Номны үнэ хамгийн багадаа 500 байх ёстой']
    },
    balance: Number,
    content : {
        type: String,
        required: [true,'Номын тайлбарыг оруулна уу'],
        trim:true,
        maxLength: [5000, 'Тайлбарын урт дээд тал нь 5000 тэмдэгт байх ёстой'],
    },
    bestseller:{
        type: Boolean,
        default: false
    },
    available: [String],
    category:{
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    createUser:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    updateUser:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{ toJSON: {virtuals: true}, toObject: {virtuals: true}}
)

//Mongoose Static
BookSchema.statics.computeCategoryAveragePrice = async function(catId) {
    const obj = await this.aggregate([
        {   $match: {category: catId}   },
        {   $group:{_id:"$category", avgPrice: {$avg: "$price"} }    }
    ])
    console.log(obj)
}

BookSchema.post('save', function(){
    this.constructor.computeCategoryAveragePrice(this.category)
})

BookSchema.pre('remove', function(){
    this.constructor.computeCategoryAveragePrice(this.category)
})

module.exports = mongoose.model("Book",BookSchema)