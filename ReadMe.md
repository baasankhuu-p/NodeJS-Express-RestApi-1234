# Сургалтын тухай :

## 2) Вэб хэрхэн ажилладаг вэ? POSTMAN ашиглан http мэссэжүүдийг харах

```C
    Request
```
## 5) NodeJS гэж юу вэ? Түүний бусдаас ялгарах давуу тал, single-threaded, non-blocking, event driven хандлагыг ойлгох нь
```C 
    nodeJS - V8г ашигладаг
    //file tei haritsah 
    const fs = require('fs');
    fs.writeFileSync('./cluster.json',body);
    //npm i request okey
    const request = require('request');
    request('https://nodejs.org/docs/latest-v14.x/api/cluster.json',(error, response, body) => {
        //file ruu bchh
        fs.writeFileSync('./cluster.json',body);
    })
```

## 7) HTTP library ашиглан анхныхаа сэрвэрийг бичих Nodemon ашиглан сэрвэрийг автоматаар рестарт хийх
```C
    //req -г дараах байдлаар задалж авах
    const { headers, url, method } = req;
    res.statusCode = 200;
    res.setHeader('Location','/error');

    /*Дараах байдлаар HTML г уншиж авч болно*/
    if (url === "/home") {
    fs.readFile("./src/home.html","utf-8", (err, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
    })

    /*Илгээсэн датааг авахдаа*/
    req.on('data', (chunk) => {
        body.push(chunk);
    })
    req.on('end',() => {
        const parsedBody = Buffer.concat(body).toString();
        //check user
        const password = parsedBody.split("=")[2];
        if(password=="123"){
            res.statusCode=302;
            res.setHeader('Location','/home');
            
        }
        else{
            res.statusCode=302;
            res.setHeader('Location','/error');
        }
        res.end();
    })
```
## 11) HTTP сэрвэр : CSS, JS, pdf файлаар үйлчлэх MIME Type төрлүүд
```C
    material: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
    if(url.endsWith('.pdf')){//.pdf --ээр төгсөхөд
    const parsed = urlLib.parse(url);//Зургийн URL-г авах
    // file-n neriig barij avna         -------- const urlLib = require("url"); --------  const urlPath = require("path");
    const fileName =urlPath.basename(parsed.pathname);//Зургийн нэр-г авах
    fs.readFile("./src/pdf/"+fileName, (err, data) => {
        res.statusCode = 200;
        res.setHeader("content-type","application/pdf")
        res.end(data);
    })
  }
  else if(url.endsWith('.css')){
    const parsed = urlLib.parse(url);
    const fileName =urlPath.basename(parsed.pathname);
    fs.readFile("./src/css/"+fileName, (err, data) => {
        res.statusCode = 200;
        res.setHeader("content-type","text/css")
        res.end(data);
    })
  }
  else if(url.endsWith('.js')){
    const parsed = urlLib.parse(url);
    const fileName =urlPath.basename(parsed.pathname);
    fs.readFile("./src/js/"+fileName, (err, data) => {
        res.statusCode = 200;
        res.setHeader("content-type","text/javascript")
        res.end(data);
    })
  }
```