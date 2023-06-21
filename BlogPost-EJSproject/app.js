const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require("mongoose");
const sort = require(__dirname + "/public/function/sort.js");
const data = require(__dirname + "/public/data/defaultData.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri =
  "mongodb+srv://<username>:<password>@cluster0.mfanljo.mongodb.net/BlogpostDB?retryWrites=true&w=majority";

const homelist = mongoose.Schema({
  title: String,
  body: String,
});

const List = mongoose.model("List", homelist);

const homeStarting = new List({
  title: "Home",
  body: data.homeStartingContent,
});

// homeStarting.save();
// const postarray = [homeStarting];

mongoose
  .connect(uri)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

// render home page with data
app.get("/", (req, res) => {
  List.find().then((founddata) => {
    console.log(founddata);
    sort.doSorting(founddata);
    res.render("home", { homedata: founddata });
  });
  // console.log(postarray);
});

app.get("/about", (req, res) => {
  res.render("about", { aboutdata: data.aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactdata: data.contactContent });
});

//render compose page
app.get("/compose", (req, res) => {
  res.render("compose");
});

// post req from compose page to add data
app.post("/compose", (req, res) => {
  const post = new List({
    title: req.body.posttitle,
    body: req.body.postbody,
  });
  post.save();
  res.redirect("/");
});

// individual pages
app.get("/post/:postid", (req, res) => {
  const id = req.params.postid;

  console.log(id);
  List.find({ title: id }).then((founddata) => {
    console.log(founddata);
    res.render("post", {
      posttitle: founddata[0].title,
      postbody: founddata[0].body,
    });
  });
  // postarray.find((post) => {
  //   const storetitle = _.lowerCase(post.title);
  //   storetitle === id
  //     : console.log("match not found.");
  // });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
