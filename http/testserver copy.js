const http = require('http')

const server = http.createServer((req, res) => {
    // console.log(req.headers, req.url, req.method);
    //esvel
    const {headers, url,method} = req;
    console.log("header ===> ",headers);
    console.log("url ===> ",url);
    console.log("method ===> ",method);
    //Serverluu bchh
    // res.write("Sain baina uu");
    res.setHeader("content-type","text/plan")
    //Serverluu ta ashgln bchh
    res.write("<h1>Welcome to nodes js </h1>");
    //Программыг зогсооно
    res.end();
});

//ajluulah portoo songoh
server.listen(3333, () => {
    console.log('http server 3333 Порт дээр аслаа...')
});
