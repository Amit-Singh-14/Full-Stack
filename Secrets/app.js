require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrpyt = require("mongoose-encryption");

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

// adding plugin ye auto matically jaab save() karte toh encrypt kr deta
// and find() par decrypt kr dega
userSchema.plugin(encrpyt, {
  secret: process.env.SECRET,
  encryptedFields: ["password"],
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
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });
  newUser
    .save()
    .then(() => {
      console.log("new user added");
      res.render("secrets");
    })
    .catch((err) => console.log(err.message));
});

app.post("/login", (req, res) => {
  User.findOne({ email: req.body.username }).then((result) => {
    console.log(result);
    if (result.password === req.body.password) res.render("secrets");
    else res.send("invalid username or apssword");
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000.");
});
