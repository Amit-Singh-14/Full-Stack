const expres = require("express");
const bodyParser = require("body-parser");

const app = expres();
var items = ["asdasd", "sasdasd", "erwrewer"];
//to use ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expres.static("public"));

app.get("/", (reqq, res) => {
  var today = new Date();
  var option = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  var day = today.toLocaleDateString("en-US", option);

  res.render("list", { kindofday: day, items: items });
});

app.post("/", (req, res) => {
  var item = req.body.newitem;
  items.push(item);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("server runnning on port 3000.");
});
