const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();


const homeStartingContent = "Your personal space to capture thoughts, ideas, and moments—one day at a time. Whether you're documenting your daily experiences, brainstorming creative ideas, or simply expressing yourself, Daily Journal provides a simple and intuitive platform to write, reflect, and grow."
const aboutContent = "Welcome to Daily Journal, your personal space to capture thoughts, ideas, and experiences—one day at a time. Whether you're reflecting on daily moments, setting goals, or expressing creativity, this platform is designed to help you write freely and stay organized.";
const aboutMission = "At Daily Journal, we believe that writing is a powerful tool for self-expression, reflection, and growth. Our goal is to provide a simple, distraction-free, and intuitive platform where you can document your thoughts, revisit past entries, and create a habit of journaling that enriches your daily life.";
const contactContent = "Have questions, feedback, or suggestions? ";
const nxtLine = "We'd love to hear from you! Whether you need support or just want to share your thoughts, feel free to reach out." 

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/about" , (req, res)=>{
    res.render("about", {content: aboutContent, mission: aboutMission});
});

app.get("/contact" , (req, res)=>{
    res.render("contact", {content: contactContent,
        next: nxtLine
    });
});

app.get("/compose" , (req, res)=>{
    res.render("compose");
});

app.post("/compose", (req,res) =>{
    const post = {
        title: req.body.titleBody,
        content: req.body.postBody
    };
    posts.push(post);
    
    res.redirect("/");
});

app.get("/posts/:postName", (req, res)=>{
    const requestedTitle = req.params.postName.toLowerCase();

    posts.forEach((post)=>{
        const storedTitle = post.title.toLowerCase();

        if(storedTitle === requestedTitle){
            res.render("post.ejs", { 
                title: post.title,
                content: post.content});
        }
    });
    
});

app.get("/", (req, res)=>{
    res.render("home.ejs" , {
        homeStartingContent,
        posts: posts
    });
});


app.listen(3000, ()=>{
    console.log("Server started on port 3000");
});