const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const uri = "mongodb://127.0.0.1:27017/wikiDB";

mongoose
  .connect(uri)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});

const Article = mongoose.model("Article", articleSchema);

// ------------------------------- trageting all articles--------------------------
app
  .route("/articles")

  .get((req, res) => {
    Article.find()
      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => console.log(err));
  })

  .post((req, res) => {
    // console.log(req.body);
    const data = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    data
      .save()
      .then(() => {
        res.send("articale added");
      })
      .catch((err) => {
        res.send("failed");
        console.log(err);
      });
  })

  .delete((req, res) => {
    Article.deleteMany()
      .then(() => console.log("All articles Deleted"))
      .catch((err) => {
        console.log(err);
      });
  });

// ------------------------------- trageting specific articles--------------------------

app
  .route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }).then((found) => {
      if (found) {
        res.send(found);
      } else {
        res.send("no articles matching that title was found.");
      }
    });
  })
  .put((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { strict: true }
    ).then((result) => {
      if (result) res.send("updated");
      else res.send(failed);
    });
  })
  .patch((req, res) => {
    Article.updateOne(
      { title: req.params.articleTitle },
      { $set: req.body }
    ).then((result) => {
      if (result) res.send("patch updated");
      else res.send("patch failed");
    });
  })
  .delete((req, res) => {
    Article.findOneAndDelete({ title: req.params.articleTitle }).then(
      (result) => {
        if (result) res.send("article deleted");
        else res.send("failed to delete");
      }
    );
  });

app.listen(3000, () => {
  console.log("server running at port 3000.");
});
