const http = require ('http');
const fs = require('fs');
const os = require('os');
const dir =  './pages/';
const port = 8080;

const server =http.createServer( (req, res) =>{
    
 if(req.url ==='/'){
     res.statusCode = 200;
     res.setHeader('contentType', 'text/html');
     render(res,'index.html');
 }
 else if(req.url ==='/about'){
    res.statusCode = 200;
    res.setHeader('contentType', 'text/html');
    render(res,'about.html');
}
 else if(req.url ==='/sys'){
    res.statusCode = 201;
    res.setHeader('contentType', 'text/plain');
    res.end('Your OS info has been saved successfully!');

    const content = {
        hostname:(os.hostname()),
       platform:(os.platform()),
        architecture:(os.arch()),
      numberOfCPUS:(os.cpus().length),
        networkInterfaces:(os.networkInterfaces()),
        uptime:(os.uptime()),
    };

    
fs.writeFile('./osinfo.json', JSON.stringify(content, null, 2), err =>{
if (err){
    console.error(err);
    return;
}


}
);
}
else {
        res.statusCode = 404;
        res.setHeader('contentType', 'text/html');
        render(res,'404.html');
    
}
}).listen(port, ()=>{
    console.log( `http://localhost:${port}`);
})

 const render =(res, file) =>{
fs.readFile(dir+file, (err, data) =>{
    if(err){
        res.writeHead(404, {'ContentType': 'text/html'});
       render('404.html')   
   }
    res.writeHead(200,{'ContentType': 'text/html'});
    return res.end(data);
});
}
