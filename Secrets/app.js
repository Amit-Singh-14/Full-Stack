require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//  adding session to our app
app.use(
  session({
    secret: "amitsingh.",
    resave: false,
    saveUninitialized: false,
    expires: false,
  })
);

// adding passport to our app
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userDB").then(() => {
  console.log("db connected");
});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

/*
adding passportlocalmongoose to schema 
it is for hashing and salting the password
*/
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

//createStrategy as static method to your schema.
// The createStrategy is responsible to setup passport-local LocalStrategy with the correct options.
passport.use(User.createStrategy());
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    console.log("authenticated");
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/");
});

app.post("/register", (req, res) => {
  User.register({ username: req.body.username }, req.body.password)
    .then((user) => {
      console.log(user);
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/register");
    });
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, (err) => {
    if (err) console.log(err);
    else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000.");
});
