const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const urlPath = require("path");
const server = http.createServer((req, res) => {
  const { headers, url, method } = req;

  res.setHeader("content-type", "text/html");
  if (url === "/") {
    fs.readFile("./src/index.html","utf-8", (err, data) => {
        if(err){
            res.statusCode = 500;
            res.write('<h1>Error ?</h1>');
            res.end();
        }
        else{
            res.statusCode = 200;
            res.write(data);
            res.end();
        }
    })
  } else if (url === "/login") {
    fs.readFile("./src/login.html","utf-8", (err, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
    })
  } else if (url === "/logincheck" && method === "POST") {
    // login hiisnii daraa usreh heseg
    // DATA === CHUNk1 === CHUNK2 ...
    const body = [];
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
  } else if (url === "/home") {
    fs.readFile("./src/home.html","utf-8", (err, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
    })
  }
  else if(url==="/error"){
    fs.readFile("./src/error.html","utf-8", (err, data) => {
        res.statusCode = 200;
        res.write(data);
        res.end();
    })
  }
  //url ni daraah baidlaar togsson bol
  else if(url.endsWith('.jpg') || url.endsWith('.png')){
    const parsed = urlLib.parse(url);
    // file-n neriig barij avna         -------- const urlLib = require("url"); --------  const urlPath = require("path");
    const fileName =urlPath.basename(parsed.pathname);
    fs.readFile("./src/img/"+fileName, (err, data) => {
        res.statusCode = 200;
        res.setHeader("content-type","image/jpg")
        res.end(data);
    })
  }
  else if(url.endsWith('.pdf')){
    const parsed = urlLib.parse(url);
    // file-n neriig barij avna         -------- const urlLib = require("url"); --------  const urlPath = require("path");
    const fileName =urlPath.basename(parsed.pathname);
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
  else {
    res.statusCode = 404;
    res.write("<h1>404 not found</h1>");
    console.log("====> "+url)
    res.end();
  }
});

server.listen(3333, () => {
  console.log("http сэрвэр 3333 порт дээр аслаа...");
});
