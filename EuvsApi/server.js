const express = require("express");
const dotenv = require("dotenv");

//Аппын тохиргоог ачааллах
dotenv.config({path:'./config/config.env'});

const app = express();

app.get("/",(req,res) => {
    res.send("Oke")
})

app.listen(process.env.PORT,console.log(`hello ${process.env.PORT} порт дээр ажиллаа`))