const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

//We need to parse the url addresses to the file names in our file tree
const pages = {"/":'index.html',"/about":'about.html',"/contact-me":'contact-me.html'}

http.createServer(function(req,res){
    //Extract the path
    const passedUrl = url.parse(req.url, true);
    let pathname = passedUrl.pathname;
    //Check if the requested path is a css file
    if (pathname.startsWith('/css/')) {
        const cssPath = path.join('./public', pathname);

        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/css' }); // Set the correct content type for CSS
                res.end('/* CSS not found */');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/css' }); // Set the correct content type for CSS
            res.write(data);
            res.end();
        });

        return; // Stop processing the request
    }

    //render the html files
    let pagePath;
    if(!pages[pathname]){
        //catch non existent files and return not found error
        pagePath = path.join('./public','/404.html');
    }else{
        pagePath = path.join('./public',pages[pathname]);
    }
    //Read the file and render
    fs.readFile(pagePath, (err,data) => {
        if(err){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Not Found</h1>'); // Fallback error page
            return;
        }else{
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080, () => {console.log("Server running...")});