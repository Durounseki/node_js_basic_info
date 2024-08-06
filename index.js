const express = require("express");
const app = express();
const path = require('path');
const fs = require('fs');

const pages = {"/":'index.html',"/about":'about.html',"/contact-me":'contact-me.html'}

// Serve static files (CSS, images, etc.) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));//No need for setting the content type of each file

//Handle existing pages
Object.keys(pages).forEach(key => {
    app.get(key,(req,res) => {

        const pagePath = path.join(__dirname,'public',pages[key]);
        res.sendFile(pagePath); //Use this instead of fileserver

    })
});//Again no need to set the content type, sendFile automatically handles html files

//Handle non existing pages
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});//app.use catches all the routes that do not match the patterns above

// Handle middleware errors
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging
    res.status(500).send('<h1>500 - Internal Server Error</h1>');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Basic app - listening on port ${PORT}!`));