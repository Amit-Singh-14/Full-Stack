require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 5;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB").then(() => {
  console.log("db connected");
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });
    newUser
      .save()
      .then(() => {
        console.log("new user added");
        res.render("secrets");
      })
      .catch((err) => console.log(err.message));
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ email: username }).then((result) => {
    console.log(result);
    if (result) {
      if (bcrypt.compare(password, result.password)) res.render("secrets");
      else res.send("invalid username or apssword");
    } else {
      res.send("no such user");
    }
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000.");
});
