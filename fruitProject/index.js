const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/fruitsDB", {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected"));

// creating schema
const fruitSchma = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// creating model
const Fruit = mongoose.model("Fruit", fruitSchma);

const fruit = new Fruit({
  name: "amit",
  rating: 5,
  review: " pretty nice fruit",
});

const pineapple = new Fruit({
  name: "pineapple",
  rating: 5,
  review: " pretty nice fruit",
});

pineapple.save().catch((err) => console.log(err.message));
/*

Fruit.find().then((p) => {
  console.log(p);
  // mongoose.connection.close();
});

Fruit.find({ rating: { $gte: 5 } })
  .exec()
  .then((items) => {
    items.forEach((item) => {
      console.log(item.name);
    });
    //
  });

Fruit.updateOne({ _id: "648fd3fe8a22b0eb5239cf65" }, { name: "xyz" }).then(
  () => {
    console.log("updated");
  }
);

Fruit.deleteOne({ name: "xyz" }).then(() => console.log("deleted"));
*/
/*
const mango = new Fruit({
  name: "mango",
  rating: 5,
  review: " pretty nice fruit",
});

const orange = new Fruit({
  name: "orange",
  rating: 7,
  review: " pretty nice fruit",
});

fruit.save();
Fruit.insertMany([orange, mango]).finally(console.log("send success"));
*/
// console.log(fulldata);

const personSchma = new mongoose.Schema({
  name: String,
  age: Number,
  //relationship with fruit documnet
  favorite: fruitSchma,
});

const Person = mongoose.model("Person", personSchma);

const person = new Person({
  name: "john",
  age: 37,
  favorite: pineapple,
});

person.save();

// Person.deleteMany({ name: "john" }).catch((err) => console.log(err));
Person.find().then((p) => console.log(p));
// person.save();
