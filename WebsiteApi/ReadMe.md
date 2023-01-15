# WELCOME to Amazon API 
## Rest Arhitectur - 2000 онд Roy Thomas Field докторын ажлаараа энэ архитекурыг танилцуулжээ
## 16) RESTful архитектурын ДИЗАЙНЫ ЗУРГААН ШААРДЛАГА Юуг RESTful апи гэх вэ?
### 1. Клиент/ сервэр арихтектур
### 2. Нэгдсэн интерфейсээр хандах (uniform interface)
### 3. Сервэр тал аппын төлөвийг хадгалж явах ёсгүй 
### 4. Төрөл бүрийн шатанд КЭШЛЭХ(CACHED) боломжтой
### 5. Тусдаа бие даан ажиллах үе давхаргуудаас тогтох (Layered)
### 6. Шаардлагатай үед сервэрээс клиент руу нэмэлт код өгөх ( code on demand )

## 17) Json хариулт буцаах, URL-р параметер дамжуулах Категоритой ажиллах тест endpoint үүсгэж турших
```C
    app.get("/",(req,res) => {
        res.send("Oke")
    })
    // OR
    app.get("/",(req,res) => {
        res.json({
            success: true,
            data: `${req.params.id} id-тэй категорыг энэд өгнө...`..
        })
    })
```
## 18) Express Router холбох Категоритой ажиллах router үүсгэн ашиглах
```C
    Server.js
        const categoriesRoutes = require('./routes/category')
        app.use('/api/v1/categories',categoriesRoutes);
    /routes/category.js
        const router = express.Router();
        const {
        getCategories,
        createCategory,
        } = require("../controller/category");
        router.route("/").get(getCategories).post(createCategory); //controller-s data avah
        module.exports = router;//Exportloh heregtei
```
## 57)  Категоритой ажиллах контроллер үүсгэн ашиглах
```C
    /controller/category.js
        exports.deleteCategory = (req, res, next) => {
            res.status(200).send({
                success: true,
                data: `${req.params.id} id-тэй категори-г усгана...`
            })
        }
```

## 20) Middleware гэж юу вэ? Хүсэлт бүрийг лог хийх өөрийн middleware бичих, Morgan logging middleware ашиглах
```C
    //Example next();
    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.protocol}://${req.host}${req.originalUrl}`);
        next();
    }
    //Example 2 Morgan using    
    var path = require('path')
    var morgan = require('morgan')
    var rfs = require('rotating-file-stream')

    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d', 
        path: path.join(__dirname, 'log')
    })
    app.use(morgan('combined', { stream: accessLogStream }))
```

## 22) NoSQL болон SQL өгөгдлийн сангууд гэж юу вэ? Тэдгээрийн ялгаа болон хэрэглээг ойлгох нь
```C

```

## 23) MongoDB Atlas дээр cluster үүсгэж MongoDB Compass ашиглаж холбогдох
```C
    Орчноо бэлдэх: https://mongodb.com/
    compass суулгах: https://www.mongodb.com/products/compass
```
## 24) Mongoose ODM суулгаж MongoDB өгөгдлийн сантай холбогдох
```C
    npm i mangoose
```
## 25  Console дээр өнгөтэй хэвлэх Color пакэжийг суулгаж ашиглах
```C
    $ npm i colors
```
## 26) Mongoose дээр Категорийн моделийг үүсгэх
```C
    //Body Parser - Энэ нь шинээр req ирхэд express.н json-д өгөх гэж
    app.use(express.json());
    try{
    const category = await Category.create(req.body);
    res.status(200).json({
      success: true,
      data: category,
    });
  }
  catch(err){
    res.status(400).json({
      success: false,
      error: err,
    });
  }
```
## 27) Category модел ашиглан категориудыг үүсгэх апи бичиж турших 
```C
    const mongoose = require("mongoose");
    const CategorySchema = new mongoose.Schema({
        name:{
            type: String,
            required: [
                true,'Категорийн нэрийг оруулна уу',
            ],
            unique: true,
            trim:true,
            maxLength: [50, 'Катгорийн нэрний урт дээд тал нь 50 тэмдэгт байх ёстой'],
        },
        description: {
            type: String,
            required: [
                true, 'Категорийн тайлбарыг заавал оруулна уу'
            ],
            maxlength: [500, 'Катгорийн тайлбарын урт дээд тал нь 500 тэмдэгт байх ёстой']
        }
    })
    module.exports = mongoose.model("Category",CategorySchema)
```
## 28) Category модел ашиглан бүх категориудыг авах, нэг категорийг авах апи бичиж турших
```C
    27-р ажилтай ижилхэн
    getAll => const category = await Category.find();
    getId =>  const category = await Category.findById(); OR const category = await Category.find({photo: req.params.id});
```

## 29) Category модел ашиглан бүх категори өөрчлөх, устгах апи бичиж турших
```C
    Update: 
        const category = await Category.findByIdAndUpdate(req.params.id, req.body,{
                new: true,//Шинэчлэгдсэн мэдээллийг өгнө
                runValidators: true,//Баз үүсгэж байхдаа гаргаж байасн шалгалтыг бас шалгаж өгөөрэй гэж хэлж өгнө,
            });
        }

    Delete: 
        const category = await Category.findByIdAndDelete(req.params.id);
```

## 30) Алдааг боловсруулах өөрийн middleware бичих
```C
midleware error.js
const ErrorHandler = (err, req, res, next) => {
    console.log(err.stack.cyan.undeline);
    res.status(500).json({
        success: false,
        error: err.message
    })
    next();
}
module.exports = ErrorHandler

server.js
const ErrorHandler = require('..error.js')
app.use(ErrorHandler)


using controller in category.js
    catch(err){
        next(err);
    }
```
## 31) Custom Error буюу апп даяар хэрэглэгдэх өөрийн алдааны обьектийг бичиж ашиглах
```C
    class myError extends Error {
        constructor(message, statusCode)
        {
            super(message)

            this.statusCode = statusCode
        }
    }

    module.exports = myError

    Ашиглахдаа
    const category = await Category.findById(req.params.id);
    if(!category)
    {
      throw new MyError(`${req.params.id}-ийм ID-тай Категори олдсонгүй ..`,400)
    }
```

## 32) asyncHandler функц бичиж контроллертоо ашиглах
```C
const asyncHandler = fn => (res, req, next)=> {
    Promise.resolve(fn((res, req, next))).catch(next)
}
module.exports = asyncHandler
  ||
  \/
const asyncHandler = require('../middleware/asyncHandler')
USING 
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
```
### ЭСВЭЛ NPM Ашиглах
```C
    cmd: npm install --save express-async-handler
    const asyncHandler = require('express-async-handler')
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
```

## --33) Англи алдааны мэдээллийг монгол болгож дамжуулах
## 34) Өгөгдлийн санг json файлаас бэлтгэх seeder.js файлыг бичиж ашиглах
## 35) Кирил үсгийг латин руу хөрвүүлэх, slugify ашиглах, mongoose модел дээр PRE middleware ашиглах
```C
    $ npm install transliteration --save

    const { transliterate , slugify } = require('transliteration');
    /*Bazad save hiihed*/
    [https://mongoosejs.com/docs/middleware.html#pre]
    const schema = new Schema(..);
    schema.pre('save', function(next) {
        //Сайн уу => Sain uu
        this.slug = slugify(this.name)
    next();
    });
```

## 36) MongoDB дээр Query хийж өгөгдөл шүүх нь Документ, нийлмэл документ, массиваас шүүх
```C
    db.tableNM.find({}) = (Bidnii Ashgladag SQL) => select * from tableNM
    db.tableNM.find({status : "0"}) = (Bidnii Ashgladag SQL) => select * from tableNM where status = "0"
    db.tableNM.find({status : "0"} {status: 1, item: 1}) = (Bidnii Ashgladag SQL) => select _id(default), status,item  from tableNM where status = "0"
    db.tableNM.find({status : "0"} {status: 1, item: 1,_id:0(false)}) = (Bidnii Ashgladag SQL) => select  status,item  from tableNM where status = "0"
    [https://www.mongodb.com/docs/manual/reference/operator/query/]
```

## 37) Категориудаас нэрээр, дундаж үнээр, рэйтингээр шүүх Категори үүсгэж байхад автоматаар рэйтингийг middleware дотор үүсгэх
```C
    Queries Docs 
        [https://mongoosejs.com/docs/queries.html]
    Pre deer baseruu ogogdol unshih esvel bhched bnga duudagdah uyd hj ogn
        this.averagePrice = Math.floor(Math.random()*100000)+3000;
    Huselt ywuulhdaa
        const category = await Category.find(req.query);
    Postman: find
        /api/v1/categories?averagePrice[$gte]=66589
```

## 38) Категориудаас талбарыг нь сонгож авах, эрэмбэлэх Select, Sort хийх нь
```C
    select = req.query.select || {};
    sort = req.query.sort || {};
    resolve=req.query.resolve || {};
    delete req.query.select,req.query.sort,req.query.resolve;
    console.log('deleted All',req.query);
    const category = await Category.find(req.query,select).sort("-"+sort);
```
## 39) Категориудыг хуудаслах буюу PAGINATION хэрхэн хийх вэ?
```C
    RESY=T API руу дамжуулах утгаад
    - page: Хэддүгээр хуудасны мэдээллэийг авахыг заана
    - limit: Нэг хуудсанд хэдэн үр дүн байхыг заана
    Бодож олох аргууд
    - total: Нийт элементийн тоо: Базаас авна
    - pageCount: Нийт хуудасны тоо: Math.ceil(total/limit)
    - start: Заагдсан хуудасны элементийн дэс дугаар: (pages-1)*limit+1
```