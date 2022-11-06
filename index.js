const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use(cookieParser());
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  if(req.cookies.key){
    return res.render("pages/index");
  }
  return res.redirect("/login");
});

app.post("/", async (req, res) => {
  const username = await jwt.sign("dev", "yahahahaha");
  const password = await jwt.sign("123456", "yahahahaha");
  
  const inputUsername = await jwt.sign(req.body.username, "yahahahaha");
  const inputPassword = await jwt.sign(req.body.password, "yahahahaha");
  
  if(inputUsername == username && inputPassword == password){
    res.cookie("key", inputPassword, {expires: new Date(Date.now() + 0.5 * 3600000)});
    res.redirect("/");
  }else{
    res.redirect("/login");
  }
});

app.get("/login", (req, res) => {
    res.render("pages/login");
});

app.post("/login", (req, res) => {
  res.redirect("/login");
});

app.get("/files", (req, res) => {
    res.render("pages/files");
});

app.listen(PORT, () => console.log(`App Listening to Port ${PORT}...`));
