const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");
const { name } = require("ejs");
const app = express();
//to use ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const uri =
  "mongodb+srv://<username>:<password>@cluster0.mfanljo.mongodb.net/todoListDB?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => console.log("DB connect"))
  .catch((err) => console.log(err.message));

const itemsSchema = mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

// var items = ["asdasd", "sasdasd", "erwrewer"];
const item1 = new Item({
  name: "Welcome to your todolist!",
});

const item2 = new Item({
  name: "Hit the + button to add a new item.",
});

const item3 = new Item({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

// Item.find().then((p) => console.log(p));

app.get("/", (req, res) => {
  Item.find().then((foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems);
      res.redirect("/");
    } else {
      // console.log(foundItems);
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
  });
});

app.get("/:customListName", (req, res) => {
  const customListName = _.capitalize(req.params.customListName);

  // console.log(customListName);
  if (customListName) {
    List.find({ name: customListName }).then((foundList) => {
      if (foundList.length === 0) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems,
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        // console.log(foundList[0].items);
        // console.log(foundList);

        res.render("list", {
          listTitle: foundList[0].name,
          newListItems: foundList[0].items,
        });
      }
    });
  }
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName,
  });

  if (listName === "Today") {
    item.save();
    res.redirect("/");
  } else {
    List.findOne({ name: listName }).then((foundList) => {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", async (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  // console.log(checkedItemId);
  // console.log(listName);

  if (listName === "Today") {
    console.log("loop enter");
    await Item.findByIdAndDelete(checkedItemId);
    res.redirect("/");
  } else {
    const id = await List.findOne({ name: listName });

    const a = await List.findByIdAndUpdate(id, {
      $pull: { items: { _id: checkedItemId } },
    });
    // console.log(id.id);
    res.redirect("/" + listName);
  }
});

app.listen(3000, () => {
  console.log("server runnning on port 3000.");
});
