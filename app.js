const express = require("express");
const app = express();
const path = require('node:path');

//Set the root directory of the templates in views
app.set("views",path.join(__dirname, "views"));
//Enable EJS as view engine
app.set("view engine", "ejs");

//Set the directory for static assets
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//Navigation links
const links = [
    {href: "/", text: "Home" },
    {href: "about", text: "About" },
    {href: "contact-me", text: "Contact-me"},
];

//Pages content
const HomeContent = {
    header: "Welcome",
    subheader: "Feel free to explore!",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas molestiae consequatur. Consequatur amet incidunt optio odit accusamus deserunt inventore quas hic eum, reprehenderit aliquid quibusdam soluta earum excepturi recusandae!"
}

const AboutContent = {
    header: "Durounseki",
    subheader: "Super cool web designer!",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas molestiae consequatur. Consequatur amet incidunt optio odit accusamus deserunt inventore quas hic eum, reprehenderit aliquid quibusdam soluta earum excepturi recusandae!"
}

const ContactMeContent = {
    header: "Get in touch",
    subheader: "Click the link at the bottom!",
    body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita quas molestiae consequatur. Consequatur amet incidunt optio odit accusamus deserunt inventore quas hic eum, reprehenderit aliquid quibusdam soluta earum excepturi recusandae!"
}
//Github link
const profileLink = {
    href: "https://github.com/Durounseki",
    aria: "GitHub profile of Durounseki",
    faClass: "fa-brands fa-github",
    text: "Durounseki"
}

//Render the views
//home
app.get("/", (req,res) => {
    res.render("index",{links: links, content: HomeContent, link: profileLink });
});
//about
app.get("/about", (req,res) => {
    res.render("about",{links: links, content: AboutContent, link: profileLink });
});
//contact-me
app.get("/contact-me", (req,res) => {
    res.render("contact-me",{links: links, content: ContactMeContent, link: profileLink });
});
//404
app.use((req, res, next) => {
    res.status(404).render("404", {links: links, link: profileLink})
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Basic EJS - listening on port ${PORT}!`));

// const http = require('http');
// const url = require('url');
// const fs = require('fs');


// //We need to parse the url addresses to the file names in our file tree
// const pages = {"/":'index.html',"/about":'about.html',"/contact-me":'contact-me.html'}

// http.createServer(function(req,res){
//     //Extract the path
//     const passedUrl = url.parse(req.url, true);
//     let pathname = passedUrl.pathname;
//     //Check if the requested path is a css file
//     if (pathname.startsWith('/css/')) {
//         const cssPath = path.join('./public', pathname);

//         fs.readFile(cssPath, (err, data) => {
//             if (err) {
//                 res.writeHead(404, { 'Content-Type': 'text/css' }); // Set the correct content type for CSS
//                 res.end('/* CSS not found */');
//                 return;
//             }

//             res.writeHead(200, { 'Content-Type': 'text/css' }); // Set the correct content type for CSS
//             res.write(data);
//             res.end();
//         });

//         return; // Stop processing the request
//     }

//     //render the html files
//     let pagePath;
//     if(!pages[pathname]){
//         //catch non existent files and return not found error
//         pagePath = path.join('./public','/404.html');
//     }else{
//         pagePath = path.join('./public',pages[pathname]);
//     }
//     //Read the file and render
//     fs.readFile(pagePath, (err,data) => {
//         if(err){
//             res.writeHead(404, { 'Content-Type': 'text/html' });
//             res.end('<h1>404 - Not Found</h1>'); // Fallback error page
//             return;
//         }else{
//             res.writeHead(200,{'Content-Type': 'text/html'});
//             res.write(data);
//             return res.end();
//         }
//     });
// }).listen(8080, () => {console.log("Server running...")});