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
//Error Messages
const errors = [
    {
        code: "404",
        text: "Page not found"
    },
    {
        code: "500",
        text: "Internal Server Error"
    }
]

//Render the views
//home
app.get("/", (req,res) => {
    res.render("content-page",{title: "Home", links: links, content: HomeContent, link: profileLink });
});
//about
app.get("/about", (req,res) => {
    res.render("content-page",{title: "About", links: links, content: AboutContent, link: profileLink });
});
//contact-me
app.get("/contact-me", (req,res) => {
    res.render("content-page",{title: "Contact me", links: links, content: ContactMeContent, link: profileLink });
});
//404
app.use((req, res, next) => {
    res.status(404).render("error-page", {error: errors[0], links: links, link: profileLink})
});
// Handle middleware errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).render("error-page", {error: errors[1], links: links, link: profileLink});
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Basic EJS - listening on port ${PORT}!`));