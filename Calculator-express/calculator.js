const express = require("express");

// jo data hum send kr rahe h usko access krne kw liyw
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", (req, res) => {
    // type casting
var num1 = Number(req.body.num1)
var num2 = Number(req.body.num2)
    res.send("sum = "+(num1+num2))

});

app.listen("3000", () => {
  console.log("server running on port 3000");
});
